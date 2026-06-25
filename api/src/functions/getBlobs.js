import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

app.http('getBlobs', {
    method: 'GET',
    authLevel: 'anonymous',
    handler: async (request, context) => {

        // container for blobs
        const fetchedBlobs = []

        // container name to fetch
        const containerName = request.query.get('containerName')

        // set connection properties
        const storageConnection = process.env.PROD_STORAGE_CONNECTION_STRING
        // const containerName = 'markdown-files'
        const blobSlice = containerName === 'markdown-files' ? 3 : 5 
        
        try{

             // establish connections 
            const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
            const containerClient = blobServiceClient.getContainerClient(containerName)

            
            // get all blobs

            if(containerName === 'markdown-files') {
                for await(const blob of containerClient.listBlobsFlat({includeMetadata: true})){
                    const blobMeta = blob.metadata ? blob.metadata : 'no metadata'
                    fetchedBlobs.push({
                        name: blob.name,
                        created: blob.properties.createdOn,
                        metaData: blobMeta
                    })
                }
            } else {
                for await(const blob of containerClient.listBlobsFlat()){
                    const blobClient = containerClient.getBlobClient(blob.name)
                    fetchedBlobs.push({
                        name: blob.name,
                        created: blob.properties.createdOn,
                        publicImageUrl: blobClient.url
                    })
                }
            }

            // get latest three blobs
            const sortedBlobs = fetchedBlobs.toSorted((a,b) => new Date(b.created) - new Date(a.created)).slice(0, blobSlice)
            context.log("fetched blobs", sortedBlobs)

            return {
                status: 200,
                body: JSON.stringify({
                    fetchedBlobs: sortedBlobs ?? {}
                }),
                headers: { 'Content-Type': 'application/json' }
            }


        } catch(err){
            context.log('Error getting blobs from storage, check connection properties', err)
        } 
    }
});
