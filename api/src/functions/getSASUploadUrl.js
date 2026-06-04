import { app } from '@azure/functions'
import { BlobServiceClient, ContainerSASPermissions } from "@azure/storage-blob"

app.http('getSASUploadUrl', {
    method: 'GET',
    authLevel: 'anonymous',
    handler: async (request, context) => {

        // get query parameters
        const fileName = request.query.get('fileName')
        const fileType = request.query.get('fileType')

        // set connection properties
        const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING
        const containerName = 'image-files'
        
        try {

             // establish connections 
            const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
            const containerClient = blobServiceClient.getContainerClient(containerName)

            // set the name of the blob that this file will create in the container
            const blobName = `${Date.now()}-${fileName}`
            const blobClient = containerClient.getBlockBlobClient(blobName)

            // generate temporary SAS token for uploading
            const sasUrl = await blobClient.generateSasUrl({
                permissions: ContainerSASPermissions.parse('w'),
                expiresOn: new Date(new Date().valueOf() + 15 * 60 * 1000),
                contentType: fileType
            })

            // generate temporary SAS token for reading image 
            const readSasUrl = await blobClient.generateSasUrl({
                permissions: ContainerSASPermissions.parse('r'),
                expiresOn: new Date(new Date().valueOf() + 24 * 60 * 60 * 1000),
                contentType: fileType
            })

            return {
                status: 200,
                body: JSON.stringify({
                    uploadUrl: sasUrl,
                    imageUrl: readSasUrl,
                    publicImageUrl: blobClient.url
                }),
                headers: { 'Content-Type': 'application/json' }
            }

        } catch(err){
            context.log("backend failed to generate SAS token, check that your api is configured correctly")
        }
    }
});
