const { app } = require('@azure/functions');

// API function - for user info
// read this resource for local testing setup:
// https://learn.microsoft.com/en-us/azure/static-web-apps/local-development#authorization-and-authentication-emulation

// Some definitions in the context of this setup

// Identity Provider - Google
// Service Principal (Local Identity) - When you register your application in Azure to use Google for auth, 
//      Azure creates an App Registration and an associated Service Principal. 
//      This service principal is what defines the permissions and access levels your application has within your 
//      Azure environment  

app.http('getUserInfo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        
    // 1. get base64 encoded header
        const header = request.headers.get('x-ms-client-principal')

        if (!header) {
            return { 
                status: 401, 
                body: JSON.stringify({ message: "User not authenticated" }) 
            };
        }
    
    // 2. decode and parse user data from header

        const encoded = Buffer.from(header, 'base64')
        const decoded = encoded.toString('ascii')
        const user = JSON.parse(decoded)

    // 3. return user data which will have:
        // identityProvider, userId, userDetails (email/username), and userRoles

        return {
            body: JSON.stringify({
                clientPrincipal: user
            })
        }

    }
});
