import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

app.http('uploadMkdToStorage', {
    method: 'POST',
    authLevel: 'anonymous',
    handler: async (request, context) => {
    
        // set connection properties
        const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING || process.env.BLOB_STORAGE_CONNECTION_STRING
        const containerName = 'markdown-files'
        
        // parse incoming request depending payload 
        const parseRequest = async (req) => {
            if (!req) {
                throw new Error('the request is empty')
            }
            try {
                // if the request already has a body
                if(req.body) return req.body
                // if the request is raw text
                if(typeof req === 'text' || typeof req === 'string') return JSON.parse(req)
            } catch(err) {
                context.log('error parsing request', err)
            }
        }

        const body = await parseRequest(request)

        if(!body) {
          return { status: 400, body: 'Request body not found or could not be parsed as JSON' }  
        }
        
        // destructure the request into key variables expected by blob container
        const markdownContent = body.content || body.markdown || ''
        const markdownMeta = body.metaData || body.meta || {}
        const fileName = body.fileName || `post-${Date.now()}.md`
        // const fileName = request.query.get('file')

        if(!markdownContent) {
            return { status: 400, body: 'the request body did not contain markdown content'}
        }

        // connect to blob storage

        

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
