import {SQSEvent} from 'aws-lambda';
import {productsRepository} from '../dataAccess/productsRepository';
import {responder} from '../helpers/responder';
import {validator} from '../helpers/validator';
import {createProductSNSRepository} from '../dataAccess/SNSRepository';
import {CreateProductPayload} from './createProduct';

export async function catalogBatchProcess(event: SQSEvent) {
    try {
        const eventMessages: any[] = event.Records.map(({body}) => JSON.parse(body));
        console.log(`Records from catalogBatchProcessor, size: ${event.Records.length}, data: ${JSON.stringify(eventMessages)}`);

        let savedProducts: CreateProductPayload[] = []
        for (const eventMessage of eventMessages) {
            const {error} = validator.createBodyPayload(eventMessage);

            if (error) {
                console.log(`Error with message payload ${error}`);
                continue;
            }

            const productId = await productsRepository.createProduct(eventMessage);
            savedProducts.push(eventMessage)
            console.log(`Successfully created product ${productId}`);
        }

        if (savedProducts.length) {
            const totalCost = savedProducts.reduce((acc, item)=> {
                return acc + item.price;
            }, 0);

            await createProductSNSRepository.sendEvent<CreateProductPayload []>(savedProducts, totalCost >= 2000);
        }
    } catch (e) {
        console.error(`Error on catalogBatchProcessor: ${JSON.stringify(e)}`);
        return responder.errorResponse<string>({code: 500, message: JSON.stringify(e)})
    }
}