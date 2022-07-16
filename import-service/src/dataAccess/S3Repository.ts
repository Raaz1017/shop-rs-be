import AWS, {S3} from 'aws-sdk';
import stream from 'node:stream';
import csv from 'csv-parser';
import {sqsRepository} from './SQSRepository';
import {ImportProductPayload} from '../contracts/interfaces';


export class S3Repository {
    private readonly s3: S3;
    private readonly bucketName: string = 'product-shop-rs';

    constructor() {
        const configuration: S3.Types.ClientConfiguration = {
            region: 'eu-west-1',
        }

        this.s3 = new AWS.S3(configuration);
    }

    public async createSignedLink(folder: string, fileName: string): Promise<string> {
        const params = {
            Bucket: this.bucketName,
            Key: `${folder}/${fileName}`,
            ContentType: 'text/csv'
        }

        return  this.s3.getSignedUrlPromise('putObject', params);
    }

    public async readFileAndRemove(fileNameWithPrefix: string): Promise<void> {
        const params: S3.Types.GetObjectRequest = {
            Bucket: this.bucketName,
            Key: fileNameWithPrefix,
        }

        return new Promise((resolve, reject) => {
            const s3Stream: stream.Readable = this.s3.getObject(params).createReadStream();

            s3Stream
                .pipe(csv({
                    separator: ';',
                    headers: ['title', 'description', 'price', 'count']
                }))
                .on('data', async (data: any) => {
                    console.log(`Data chunk: ${JSON.stringify(data)}`);
                    const dataForProcessing: ImportProductPayload = {
                        title: data.title,
                        count: data.count,
                        description: data.description,
                        price: data.price
                    }
                    await sqsRepository.sendCsvDataToProcessor(dataForProcessing);
                })
                .on('error', (err: Error) => {
                    console.error(`Error in reading data: ${err}`);
                    reject(err);
                })
                .on('end', async () => {
                    const copyParams: S3.Types.CopyObjectRequest = {
                        Bucket: this.bucketName,
                        Key: fileNameWithPrefix.replace('uploaded/', 'parsed/'),
                        CopySource: `${this.bucketName}/${fileNameWithPrefix}`
                    };

                    await this.s3.copyObject(copyParams).promise();

                    const deleteParams: S3.Types.DeleteObjectRequest = {
                        Bucket: this.bucketName,
                        Key: fileNameWithPrefix,
                    }
                    await this.s3.deleteObject(deleteParams).promise();
                    resolve();
                })
        })
    }
}

export const s3Repository: S3Repository = new S3Repository();