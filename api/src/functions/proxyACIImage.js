import { app } from '@azure/functions'

app.http('proxyACIImage', {
    method: 'GET',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        
        const imageId = request.query.get('imageId')

        if(!imageId){
            return {
                status: 400,
                body: 'Missing image id query parameter'
            }
        }

        const imageUrl = `https://www.artic.edu/iiif/2/${encodeURIComponent(imageId)}/full/843,/0/default.jpg`

        try {

            const response = await fetch(imageUrl, {
                headers: { 
                    'AIC-User-Agent': 'CedricEdricNet/1.0 (+https://www.cedricedric.net; contact@cedricedric.net)',
                    'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://www.cedricedric.net/' 
                }
            })

            context.log(response)

            if(!response.ok){
                return {
                    status: response.status,
                    body: `Remote image fetch failes ${response.statusText}`
                }
            }

            // getting the response headers is a key piece of this 
            // const contentType = response.headers.get('content-type') || 'image/jpeg'
            const contentType = response.headers.get('content-type') || 'image/jpeg'
            // a fixed-length, generic raw binary data buffer. Think of it as a contiguous chunk of physical memory (RAM) allocated directly for the image data
            const arrayBuffer = await response.arrayBuffer()
            // Buffer instance that shares the same underlying memory as the provided ArrayBuffer
            const buffer = Buffer.from(arrayBuffer)

            return {
                status: 200,
                body: buffer,
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=86400',
                }
            }

        } catch(err) {
            context.log.error('proxy image request error', err)
            return {
                status: 500,
                body: 'failed to proxy ACI image'
            }
        }

    }
});
