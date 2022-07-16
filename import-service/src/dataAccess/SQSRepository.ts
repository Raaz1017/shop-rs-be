import AWS, {SQS} from 'aws-sdk';
import {ImportProductPayload} from '../contracts/interfaces';

export class SQSRepository {
    private readonly sqsClient: SQS;
    private readonly catalogItemsQueueUrl: string;

    constructor(sqsURL: string) {
        const sqsClientConfig: SQS.Types.ClientConfiguration = {
            region: 'eu-west-1',
            endpoint: sqsURL
        }

        this.catalogItemsQueueUrl = sqsURL;
        this.sqsClient = new AWS.SQS(sqsClientConfig);
    }

    public async sendCsvDataToProcessor(data: ImportProductPayload): Promise<void> {
        const messageParams: SQS.Types.SendMessageRequest = {
            MessageBody: JSON.stringify(data),
            DelaySeconds: 0,
            QueueUrl: this.catalogItemsQueueUrl
        }

        try {
            await this.sqsClient.sendMessage(messageParams).promise();
        } catch (e) {
            console.log('Error in sending message', e);
        }

    }
}

export const sqsRepository: SQSRepository = new SQSRepository(process.env.SQS_URL || '');