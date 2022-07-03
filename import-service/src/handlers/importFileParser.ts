import {S3CreateEvent} from 'aws-lambda';
import {responder} from '../helpers/responder';
import {s3Repository} from '../dataAccess/S3Repository';

export async function importFileParser(event: S3CreateEvent) {
    try {
        console.log('Event log from importFileParser:', JSON.stringify(event));
        for (const record of event.Records) {
            const {key} = record.s3.object;
            await s3Repository.readFileAndRemove(key);
            console.log('Successfully parse objet: ', key);
        }
        return responder.successResponse({code: 200, message: 'Successfully parsed object'})
    } catch (e: any) {
        console.error(`Error on importProductsFile: ${JSON.stringify(e)}`);
        return responder.errorResponse<string>({code: 500, message: e.message})
    }
}