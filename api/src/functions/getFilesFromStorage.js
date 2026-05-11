const { app } = require('@azure/functions')
const { BlobServiceClient } = require("@azure/storage-blob")

app.http('getFilesFromStorage', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        // specify connection and container

        // const storageConnection = process.env.BLOB_STORAGE_CONNECTION_STRING
        const storageConnection = "UseDevelopmentStorage=True"
        const containerName = 'markdown-files'
        
        // get search term from request. this setup accesses a query parameter called "search" from the frontend
        // for instance https://www.cedricedric.net?search=${searchTerm}
        const search = request.query.get('search') || ''

        // setup BlobServiceClient -> ContainerClient
        const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
        const containerClient = blobServiceClient.getContainerClient(containerName)

        // set up iterator over blobs to seach via includes

        let blobs = []

        for await (const blob of containerClient.listBlobsFlat()) {
            if(blob.name.includes(search)) {
                blobs.push({
                    name: blob.name,
                    url: `${containerClient.url}/${blob.name}`,
                    properties: blob.properties // all blobs have read-only properties
                })
            }
        }

        return { body: JSON.stringify(blobs), headers: { 'Content-Type': 'application/json' } }
    }
});
