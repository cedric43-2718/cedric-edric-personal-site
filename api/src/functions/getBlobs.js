const { app } = require('@azure/functions');

app.http('getBlobs', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

         // get file name from query parameter
        const fileName = request.query.get('fileName')
        const fetchedBlobs = []

        // set connection properties
        const storageConnection = process.env.DEV_BLOB_STORAGE_CONNECTION_STRING
        const containerName = 'markdown-files'
        
        try{

             // establish connections 
            const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
            const containerClient = blobServiceClient.getContainerClient(containerName)
            const blobClient = containerClient.getBlobClient(fileName)

            // get all blobs

            for await(const blob of containerClient.listBlobsFlat({includeMetadata: true})){
                const blobMeta = blob.metadata ? blob.metadata : 'no metadata'
                fetchedBlobs.push({
                    name: blob.name,
                    created: blob.properties.creationTime,
                    metaData: blobMeta
                })
            }
            context.log("fetched blobs", fetchedBlobs)


        } catch(err){
            context.log('Error getting blobs from storage, check connection properties', err)
        } 
    }
});
