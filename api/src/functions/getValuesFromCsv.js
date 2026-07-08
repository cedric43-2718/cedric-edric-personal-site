import { app } from '@azure/functions'
import { BlobServiceClient } from "@azure/storage-blob"

import csv from 'csv-parser'
import { Readable } from 'stream'

app.http('getValuesFromCsv', {
    method: 'GET',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        
        // set connection properties
        const storageConnection = process.env.PROD_STORAGE_CONNECTION_STRING
        const containerName = 'site-data'
        const blobName = 'user-roles1.csv'

        const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnection)
        const containerClient = blobServiceClient.getContainerClient(containerName)

        if (!storageConnection) {
            throw new Error("Storage connection string is undefined");
        }

        const blobClient = containerClient.getBlobClient(blobName)

        // value to test
        const userEmail = request.query.get('email')

        // column to test
        const userRole = request.query.get('role')

        try {
            // download blob as a text stream into a string
            const blobClientDownloadStream = await blobClient.download()
            const blobTextContent = await streamToText(blobClientDownloadStream.readableStreamBody)
            
            // parse csv and test for value
            const exists = await valueExistsInCsv(blobTextContent, userEmail, userRole)

            return {
                status: 200,
                body: JSON.stringify({
                    valueExists: exists
                }),
                headers: { 'Content-Type': 'application/json' }
            }
           
        } catch(err) {
            context.error("parsing csv failed", err);
            return {status: 500, body: 'failed to read csv'}
        }
    }
});

async function valueExistsInCsv(csvText, testValue1, testValue2) {

    const testColumn1 = 'email'
    const testColumn2 = 'role1'

    for await(const row of Readable.from(csvText).pipe(csv())) {
        if(row[testColumn1] === testValue1 & row[testColumn2] === testValue2) {
            return true
        }
    }
    return false
}

async function streamToText(readable) {
    readable.setEncoding('utf8');
    let data = '';
    for await (const chunk of readable) {
        data += chunk;
    }
    return data;
}