import {responder} from '../helpers/responder';
import {ProductFullModel, productsRepository} from '../dataAccess/productsRepository';
import {APIGatewayEvent} from 'aws-lambda';

export async function getProductsList(event: APIGatewayEvent) {
    try {
        console.log('Event log from getProductsList:', JSON.stringify(event));
        const products: ProductFullModel[] = await productsRepository.getAllProducts();
        return responder.successResponse<ProductFullModel[]>({code: 200, message: products});
    } catch (error: any) {
        console.error(`Error on getProductList: ${JSON.stringify(error)}`);
        return responder.errorResponse<string>({code: 500, message: error.message})
    }
}