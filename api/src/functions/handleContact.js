const { app } = require('@azure/functions');
const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];
const client = new EmailClient(connectionString);

async function SendEmail(name, message, email) {
    
    const emailMessage = {
        senderAddress: "DoNotReply@cedricedric.net",
        content: {
            subject: "CedricEdric Contact Form",
            plainText: "Message",
            html: `
			<html>
				<body>
					<h1>
						Sender Name: ${name}
					</h1>
                    <h2>
                        Sender Email: ${email}
                    </h2>
                    <p>
                        Message: ${message}
                    </p>
				</body>
			</html>`,
        },
        recipients: {
            to: [{ address: "jrudokas@cedricedric.net" }],
        },
        
    };

    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();
    return result
}

app.http('handleContact', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const { firstName, lastName, message, email} = await request.json()

            // basic validation

            if(!firstName || !lastName || !message || !email){
                return {
                    status: 400,
                    body: JSON.stringify({success: false, message: 'Missing required form fields'})
                }
            } 
            
            const name = firstName.trim() + ' ' + lastName.trim()

            const result = await SendEmail(name, message, email)
            context.log(`Email sent successfully: ${result}`)

            return {
                status: 200,
                body: JSON.stringify({success: true, message: 'Email sent successfully'})
            }

        } catch(error) {
            context.log(`Error sending email ${error}`)
            return{
                status: 500,
                body: JSON.stringify({success: false, message: 'Error sending email'})
            }

        }
    }
});
