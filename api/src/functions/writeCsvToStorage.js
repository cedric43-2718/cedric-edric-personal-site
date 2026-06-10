const { app } = require('@azure/functions');

app.http('writeCsvToStorage', {
    method: 'POST',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        
    }
});
