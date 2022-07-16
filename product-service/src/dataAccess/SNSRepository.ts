import {SNS} from 'aws-sdk';

export class SNSRepository {
    private readonly snsClient: SNS;
    private readonly snsArn: string

    constructor(snsArn: string) {
        const clientConfiguration: SNS.Types.ClientConfiguration = {
            region: 'eu-west-1',
        }

        this.snsArn = snsArn;
        this.snsClient = new SNS(clientConfiguration);
    }

    public async sendEvent<T>(body: T, isHighlyCost: boolean): Promise<any> {
        const messagePayload: SNS.Types.PublishInput= {
            TopicArn: this.snsArn,
            Message: JSON.stringify(body),
            Subject: 'New products uploaded',
            MessageAttributes: {
                type: {
                    DataType: 'String',
                    StringValue: isHighlyCost ? 'highly_cost' : 'normal'
                }
            }
        }

        return this.snsClient.publish(messagePayload).promise()
    }
}

export const createProductSNSRepository = new SNSRepository(process.env.SNS_ARN || '');