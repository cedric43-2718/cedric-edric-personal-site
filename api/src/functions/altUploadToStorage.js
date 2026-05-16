import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

app.http('altUploadToStorage', {
  method: 'POST',
  authLevel: 'anonymous',
  handler: async (request, context) => {

    // Prefer a developer/test connection string for Azurite when available
    const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING || process.env.BLOB_STORAGE_CONNECTION_STRING
    const containerName = 'markdown-files'

    // Robust request parsing to support different runtimes / payload shapes
    const parseBody = async (req) => {
      if (!req) return null
      try {
        // @azure/functions HttpRequest usually has a .body property
        if (req.body) return req.body
        // Some runtimes may pass the raw string
        if (typeof req === 'string') return JSON.parse(req)
        // Fallback: try to read as text then parse
        if (typeof req.text === 'function') {
          const txt = await req.text()
          try { return JSON.parse(txt) } catch { return { content: txt } }
        }
      } catch (e) {
        context.log('parseBody error', e)
      }
      return null
    }

    const body = await parseBody(request)

    if (!body) {
      return { status: 400, body: 'Request body not found or could not be parsed as JSON' }
    }

    const markdownContent = body.content || body.markdown || ''
    const markdownMeta = body.metaData || body.meta || {}
    const fileName = body.fileName || body.file || `post-${Date.now()}.md`

    if (!markdownContent) {
      return { status: 400, body: 'No markdown content provided' }
    }

    // Connect to blob storage (Azurite-friendly connection string expected)
    let blobServiceClient
    try {
      blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
    } catch (err) {
      context.log('Failed to create BlobServiceClient:', err.message)
      return { status: 500, body: 'Storage connection failure. Check DEV_BLOB_STORAGE_CONNECTION_STRING.' }
    }

    const containerClient = blobServiceClient.getContainerClient(containerName)

    try {
      // Ensure the container exists locally (create if missing)
      await containerClient.createIfNotExists()
    } catch (err) {
      context.log('Failed to create or access container:', err)
      return { status: 500, body: 'Failed to access blob container' }
    }

    const blockBlobClient = containerClient.getBlockBlobClient(fileName)

    // Prepare metadata; blob metadata values must be strings
    const metadata = {}
    if (markdownMeta.authorName) metadata.author = String(markdownMeta.authorName)
    if (markdownMeta.title) metadata.title = String(markdownMeta.title)
    if (markdownMeta.date) metadata.date = String(markdownMeta.date)
    if (markdownMeta.description) metadata.description = String(markdownMeta.description)

    const uploadOptions = {
      metadata,
      blobHTTPHeaders: {
        blobContentType: 'text/markdown'
      }
    }

    try {
      // Use uploadData for reliable uploads (handles Buffer/Uint8Array)
      const data = Buffer.from(markdownContent, 'utf8')
      await blockBlobClient.uploadData(data, uploadOptions)

      // Return the blob URL so the caller can inspect the result in Azurite
      return {
        status: 201,
        body: {
          message: 'Uploaded to blob storage',
          url: blockBlobClient.url,
          fileName,
          metadata
        }
      }
    } catch (err) {
      context.log('Upload failed:', err)
      return { status: 500, body: 'File upload failed: ' + (err.message || err) }
    }
  }
})
