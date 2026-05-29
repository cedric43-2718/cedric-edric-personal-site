import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

app.http('getMkdFromStorage', {
    method: 'GET',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        
        // get file name from query parameter
        const fileName = request.query.get('fileName')

        // set connection properties
        const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING
        const containerName = 'markdown-files'

        try {

            // establish connections 
            const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
            const containerClient = blobServiceClient.getContainerClient(containerName)
            const blobClient = containerClient.getBlobClient(fileName)

            // download blob as a readable stream and convert to text
            const downloadResponse = await blobClient.download()
            const downloadedBlobText = await streamToString(downloadResponse.readableStreamBody)

            // get blob properties 
            const properties = await blobClient.getProperties()

            return {
                status: 200,
                body: JSON.stringify({
                    fileName,
                    markdown: downloadedBlobText,
                    metadata: properties.metadata ?? {}
                }),
                headers: { 'Content-Type': 'application/json' }
            }
        } catch(err) {
            context.error("error processing request", err.message)
            return { 
                status: 400, 
                body: "Invalid request data or processing error." 
            }
        }
    }
});

async function streamToString(readableStream){
    return new Promise((resolve, reject) => {
        const chunks = []
        readableStream.on("data", (data) => chunks.push(data.toString()))
        readableStream.on("end", () => resolve(chunks.join("")))
        readableStream.on("error", reject)
    })
}
