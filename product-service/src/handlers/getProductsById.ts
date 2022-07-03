import {responder} from '../helpers/responder';
import {APIGatewayEvent} from 'aws-lambda';
import {ProductFullModel, productsRepository} from '../dataAccess/productsRepository';
import {validator} from '../helpers/validator';

export async function getProductsById(event: APIGatewayEvent) {
    try {
        console.log('Event log from getProductsById:', JSON.stringify(event));
        const {productId} = event?.pathParameters as {productId: string};

        if (!productId?.length) {
            return responder.errorResponse<string>({code: 400, message: 'Bad request'});
        }

        const {error} = validator.validateUUID(productId);

        if (error) {
            return responder.errorResponse<string>({code: 400, message: error.message});
        }

        const product: ProductFullModel | null = await productsRepository.getProductById(productId);

        if (!product) {
            return responder.errorResponse<string>({code: 404, message: `Product with id ${productId} is not found`});
        }

        return responder.successResponse<ProductFullModel>({code: 200, message: product});
    } catch (e: any) {
        console.error(`Error on getProductsById: ${JSON.stringify(e)}`);
        return responder.errorResponse<string>({code: 500, message: e.message})
    }

}