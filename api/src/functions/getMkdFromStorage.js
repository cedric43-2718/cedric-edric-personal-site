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
    }
});
