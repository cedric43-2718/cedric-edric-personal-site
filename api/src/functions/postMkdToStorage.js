const { app, output } = require('@azure/functions');
import { BlockBlobClient } from "@azure/storage-blob";

// create the structre of an output binding, this will change a bit but this is the basic immediate

const blobOutput = output.storageBlob({
    // connection: 'DefaultEndpointsProtocol=https;AccountName=cedricedricstorage;AccountKey=V939ptDXWskHR67p6rdr10gZPaOY5mNaZfN9gqFl1BiR4lUhbAP1puN8ofQzOc7ysdUha68mA3Dt+AStHUlIhg==;EndpointSuffix=core.windows.net',
    // connection: 'UseDevelopmentStorage',
    path: 'markdown-files/file4.md' // this assumes a container in the blob storage container called markdown-files
})

app.http('postMkdToStorage', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [blobOutput], // secondary output bindings
    handler: async (request, context) => {
        
        // expects {content: "some markdown string"}
        const body = await request.json()
        const markdownContent = body.content 

        if(!markdownContent) {
            return { status: 400, body: 'the request body did not contain the expected markdown content'}
        }

        // send content to blob output binding

        context.extraOutputs.set(blobOutput, markdownContent)

        return { status: 201, body: 'file pased and saved to blob storage' };
    }
});



