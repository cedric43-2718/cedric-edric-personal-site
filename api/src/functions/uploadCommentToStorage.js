import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

app.http('uploadCommentToStorage', {
    method: 'POST',
    authLevel: 'anonymous',
    handler: async (request, context) => {

        // parent article name for comments
        const articleName = request.query.get('articleName')
        const commentBlob = `${articleName}-comments.json`

        // set connection properties
        const storageConnection = process.env.PROD_STORAGE_CONNECTION_STRING
        const containerName = 'markdown-files'
        
        // parse incoming request depending payload 
        const body = await request.json()
        context.log("body", body)

        if(!body) {
            return { status: 400, body: 'Request body not found or could not be parsed as JSON' }  
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
        const containerClient = blobServiceClient.getContainerClient('markdown-files')
        const appendBlobClient = containerClient.getAppendBlobClient(commentBlob)

        await appendBlobClient.createIfNotExists({
            blobHTTPHeaders: { blobContentType: 'application/json' }
        })
        
        const commentsPayload = Buffer.from(JSON.stringify(body) + '\n', 'utf8')

        try {

            await appendBlobClient.appendBlock(commentsPayload, commentsPayload.length)

            return { status: 200, body: "Data successfully appended to blob." }

        } catch (err){
            context.log('Upload failed:', err)
            return { status: 500, body: 'File upload failed: ' + (err.message || err)}
        }


    }
});
