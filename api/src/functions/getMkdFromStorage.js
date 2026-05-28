import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

app.http('getMkdFromStorage', {
    method: 'GET',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        
        // get file name from query parameter
        const fileName = request.query.get('fileName')
        const fetchedBlobs = []

        // set connection properties
        const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING
        const containerName = 'markdown-files'

        try {

            // establish connections 
            const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
            const containerClient = blobServiceClient.getContainerClient(containerName)
            const blobClient = containerClient.getBlobClient(fileName)

            // list all blobs, this is for testing, later I'll factor this out to a new method
            // but since I'm here

            for await(const blob of containerClient.listBlobsFlat({includeMetadata: true})){
                const blobMeta = blob.metadata ? blob.metadata : 'no metadata'
                fetchedBlobs.push({
                    name: blob.name,
                    created: blob.properties.creationTime,
                    metaData: blobMeta
                })
            }
            context.log("fetched blobs", fetchedBlobs)

            // download blob as a readable stream and convert to text
            const downloadResponse = await blobClient.download()
            const downloadedBlobText = await streamToString(downloadResponse.readableStreamBody)

            return {
                status: 200,
                body: downloadedBlobText,
                headers: { 'Content-Type': 'text/markdown' }
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
