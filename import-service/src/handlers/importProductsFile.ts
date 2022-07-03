import {APIGatewayEvent} from 'aws-lambda';
import {s3Repository} from '../dataAccess/S3Repository';
import {responder} from '../helpers/responder';

export interface ImportEventPayload extends APIGatewayEvent {
    queryStringParameters: {
        name: string
    }
}

export async function importProductsFile(event: ImportEventPayload) {
    try {
        console.log('Event log from importProductsFile:', JSON.stringify(event));

        const {name: fileName} = event.queryStringParameters;

        if (!fileName.includes('.csv')) {
            return responder.errorResponse<string>({code: 400, message: `File Type must be CSV`});
        }

        const signedUrl = await s3Repository.createSignedLink('uploaded', fileName);

        return responder.successResponse<string>({code: 200, message: signedUrl});
    } catch (e: any) {
        console.error(`Error on importProductsFile: ${JSON.stringify(e)}`);
        return responder.errorResponse<string>({code: 500, message: e.message})
    }
}