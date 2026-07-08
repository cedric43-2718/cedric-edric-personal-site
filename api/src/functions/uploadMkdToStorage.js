import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

app.http('uploadMkdToStorage', {
    method: 'POST',
    authLevel: 'anonymous',
    handler: async (request, context) => {
    
        // set connection properties
        const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING
        const containerName = 'markdown-files'
        
        // parse incoming request depending payload 
        const body = await request.json()
        context.log("body", body)

        if(!body) {
          return { status: 400, body: 'Request body not found or could not be parsed as JSON' }  
        }
        
        // destructure the request into key variables expected by blob container
        // const markdownContent = body.content || body.markdown || ''
        const markdownContent = body.content
        const markdownMeta = body.metaData
        const articleId = body.articleId

        if(!markdownContent) {
            context.log("markdown", markdownContent)
            return { status: 400, body: 'the request body did not contain markdown content'}
        }

        // connect to blob storage

       let blobServiceClient
       try {
        blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
       } catch(err) {
        context.log('failed to create BlobServiceClient:', err.message)
        return { status: 500, body: 'Storage connection failure. Check PROD_STORAGE_CONNECTION_STRING.'}
       }
        
       // is the blobServiceClient null, undefined or empty
       if(blobServiceClient === null) {
            return { status: 400, body: 'the connection exists, but is not properly configured'}
        }

        const articleBlobName = articleId
        const commentsBlobName = `${articleId}-comments.json`

        const containerClient = blobServiceClient.getContainerClient(containerName)
        const articleBlockBlobClient = containerClient.getBlockBlobClient(articleBlobName)
        const commentsAppendBlobClient = containerClient.getAppendBlobClient(commentsBlobName)

        // create metadata object  and upload options
        const metadata = {}
        if (markdownMeta?.authorName) metadata.author = String(markdownMeta.authorName)
        if (markdownMeta?.title) metadata.title = String(markdownMeta.title)
        if (markdownMeta?.date) metadata.date = String(markdownMeta.date)
        if (markdownMeta?.previewImage) metadata.previewImage = String(markdownMeta.previewImage)    
        if (markdownMeta?.creatorId) metadata.creatorId = String(markdownMeta.creatorId)    
        if (markdownMeta?.description) metadata.description = String(markdownMeta.description)   
    
        const markdownUploadOptions = {
            metadata,
            blobHTTPHeaders: {
                blobContentType: 'text/markdown' // maybe application/json
            }
        }

        const markdownPayload = Buffer.from(markdownContent, 'utf8')

        // upload data, the buffer temporarily stores chunks of data before upload
        try {
            
            // article and metadata upload
            await articleBlockBlobClient.uploadData(markdownPayload, markdownUploadOptions)

            // everytime a new article is created upload an empty comments file
            await commentsAppendBlobClient.create({
                blobHTTPHeaders: {
                    blobContentType: 'application/json'
                }
            })

            // return blob url so iy can be inspected in the azurite json containers
            // im using azure storage explorer but a good fallback
            return {
                status: 201,
                body: {
                    message: 'Uploaded to blob storage',
                    url: articleBlockBlobClient.url,
                    commentsUrl: commentsAppendBlobClient.url,
                    metadata  
                }
            }

        } catch(err) {
            context.log('Upload failed:', err)
            return { status: 500, body: 'File upload failed: ' + (err.message || err)}
        } 
    }
});
