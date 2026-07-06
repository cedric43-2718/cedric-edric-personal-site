const { app } = require('@azure/functions');

app.http('getComments', {
    method: 'GET',
    authLevel: 'anonymous',
    handler: async (request, context) => {

        // parent article name for comments
        const articleName = request.query.get('articleName')
        const commentBlob = `${articleName}-comments.json`

        // set connection properties
        const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING

        try{ 

            const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
            const containerClient = blobServiceClient.getContainerClient('markdown-files')
            const blobClient = containerClient.getBlobClient(commentBlob)

            // download json contents
            const downloadResponse = await blobClient.download()
            const commentContent = await streamToString(downloadResponse.readableStreamBody)

            // parse comments
            const parsedComments = JSON.parse(commentContent)

            return {
                status: 200,
                body: JSON.stringify({
                    fetchedComments: parsedComments.comments ?? parsedComments ?? []
                }),
                headers: { 'Content-Type': 'application/json' }
            }

        } catch(err) {
            context.log('Error getting comments from storage, check connection properties', err)
            return {
                status: 500,
                body: JSON.stringify({ error: 'Failed to load comments' }),
                headers: { 'Content-Type': 'application/json' }    
            }
        }

    }
});

async function streamToString(readableStream) {
  const chunks = []
  for await (const chunk of readableStream) {
    chunks.push(typeof chunk === 'string' ? chunk : chunk.toString())
  }
  return chunks.join('')
}