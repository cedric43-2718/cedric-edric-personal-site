const { app } = require('@azure/functions');
import { BlobServiceClient } from "@azure/storage-blob";

app.http('uploadMkdToStorage', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
    
    // const storageConnection = process.env.BLOB_STORAGE_CONNECTION_STRING
        const storageConnection = "UseDevelopmentStorage=True"
        const containerName = 'markdown-files'
        
    // recieve data from frontend
    
        const body = await request.json()
        const markdownContent = body.content
        const markdownMeta = body.metaData
        const fileName = body.fileName
        // const fileName = request.query.get('file')


    // setup connection to storage

        const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
        const containerClient = blobServiceClient.getContainerClient(containerName)
        const blockBlobClient = containerClient.getBlockBlobClient(fileName)

    // create metadata 

        const uploadOptions = {
            metadata: {
                author: markdownMeta.author,
                title: markdownMeta.title,
                subject: markdownMeta.subject,
                description: markdownMeta.description
            },
            blobHTTPHeaders: {
                blobContentType: "text/markdown" // Optional: specify content type
            }
        }

        await blockBlobClient.upload(markdownContent, markdownContent.length, uploadOptions) 
    
    }
});
