import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"
import sanitizeHtml from 'sanitize-html'

const MAX_COMMENT_LENGTH = 1000
const MAX_NAME_LENGTH = 80
const MAX_EMAIL_LENGTH = 255

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
        let body 
        try{
            body = await request.json()
        } catch {
            return { status: 400, body: 'Invalid JSON body from request'}
        }
        
        if(!body || typeof body !== 'object') {
            return { status: 400, body: 'Request body not found or is not an object' }  
        }

        context.log("unsanitized body", body)

        try {

            // sanitize payload
            const sanitizedPayload = {
                commentId: body.commentId || '',
                content: sanitizeCommentContent(body.content),
                authorName: sanitizeText(body.authorName, MAX_NAME_LENGTH),
                authorEmail: sanitizeText(body.authorEmail, MAX_EMAIL_LENGTH).toLowerCase(),
                postDate: body.postDate
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailPattern.test(sanitizedPayload.authorEmail)) {
                return { status: 400, body: 'Invalid email address' }
            }

            const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
            const containerClient = blobServiceClient.getContainerClient(containerName)
            const appendBlobClient = containerClient.getAppendBlobClient(commentBlob)

            await appendBlobClient.createIfNotExists({
                blobHTTPHeaders: { blobContentType: 'application/json' }
            })
        
            const commentsPayload = Buffer.from(JSON.stringify(sanitizedPayload) + '\n', 'utf8')
            await appendBlobClient.appendBlock(commentsPayload, commentsPayload.length)

            return { status: 200, body: "Data successfully appended to blob." }

        } catch (err){
            context.log('Upload failed:', err)
            return { status: 500, body: 'File upload failed: ' + (err.message || err)}
        }
    }
});

// remove ascii control characters

function sanitizeText(value, maxLen) {
    if (typeof value !== 'string') return ''
    return value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, maxLen)
}

// execute sanitize method

function sanitizeCommentContent(value) {
    if (typeof value !== 'string') throw new Error('Comment must be a string')

    const trimmed = sanitizeText(value, MAX_COMMENT_LENGTH)

    const cleanComment = sanitizeHtml(trimmed, {
        allowedTags: [],
        allowedAttributes: {}
    })

    if (!cleanComment) {
        throw new Error('Comment is empty after sanitizing')
    }

    return cleanComment
}