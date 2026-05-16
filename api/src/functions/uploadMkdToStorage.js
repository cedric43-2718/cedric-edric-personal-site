import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

app.http('uploadMkdToStorage', {
    method: 'POST',
    authLevel: 'anonymous',
    handler: async (request, context) => {
    
        // const storageConnection = process.env.BLOB_STORAGE_CONNECTION_STRING
        const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING
        const containerName = 'markdown-files'
        
    // recieve data from frontend
    
        // const body = await request.json()
        const body = await JSON.parse(request)
        const markdownContent = body.content
        const markdownMeta = body.metaData
        const fileName = body.fileName
        // const fileName = request.query.get('file')

        if(!markdownContent) {
            return { status: 400, body: 'the request body did not contain the expected markdown content'}
        }

    // setup connection to storage

        const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
        const containerClient = blobServiceClient.getContainerClient(containerName)
        const blockBlobClient = containerClient.getBlockBlobClient(fileName)

    // create metadata 

        const uploadOptions = {
            metadata: {
                author: markdownMeta.authorName,
                title: markdownMeta.title,
                date: markdownMeta.date,
                description: markdownMeta.description
            },
            blobHTTPHeaders: {
                blobContentType: "application/json" // Optional: specify content type "text/markdown" 
            }
        }  

        try {
            await blockBlobClient.upload(markdownContent, markdownContent.length, uploadOptions)
            return { status: 201, body: 'file pased and saved to blob storage' } 
        } catch(err) {
            console.error("file upload failed", err)
        }
        
    }
    
});
