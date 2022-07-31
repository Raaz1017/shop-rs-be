import {
    APIGatewayAuthorizerCallback,
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerEvent
} from 'aws-lambda/trigger/api-gateway-authorizer';

export function basicAuthorizer(event: APIGatewayTokenAuthorizerEvent, _: any, cb: APIGatewayAuthorizerCallback) {
    const {type, authorizationToken, methodArn} = event;

    if (type !== 'TOKEN' || !authorizationToken) return cb('Unauthorized');

    try {
        const encodedCreds: string = authorizationToken.split(' ')[1];
        if (!encodedCreds) return cb('Unauthorized');

        const buff = Buffer.from(encodedCreds, 'base64');
        const [username, password] = buff.toString('utf-8').split(':');

        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

        const generatedPolicy: APIGatewayAuthorizerResult = {
            principalId: encodedCreds,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: effect,
                        Resource: methodArn
                    }
                ],
            }
        }

        return cb(null, generatedPolicy);
    } catch (e: any) {
        console.log('Error in basicAuthorizer', JSON.stringify(e));
        return cb(`Unauthorized: ${e}`);
    }
}