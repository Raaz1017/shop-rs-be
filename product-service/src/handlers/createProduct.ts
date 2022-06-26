import {ProductFullModel, productsRepository} from '../dataAccess/productsRepository';
import {APIGatewayEvent} from 'aws-lambda';
import {responder} from '../helpers/responder';
import {validator} from '../helpers/validator';

export interface CreateProductPayload extends Omit<ProductFullModel, 'id'> {}

export async function createProduct(event: APIGatewayEvent) {
    try {
        console.log('Event log from createProduct:', JSON.stringify(event));
        const { body }= event as unknown as {body: string};

        if (!body) {
            return responder.errorResponse<string>({code: 400, message: 'Wrong body parameter'});
        }
        const parsedBody: CreateProductPayload = JSON.parse(body);
        const {error} = validator.createBodyPayload(parsedBody);

        if (error) {
            return responder.errorResponse<string>({code: 400, message: error.message});
        }

        const productId: string = await productsRepository.createProduct(parsedBody);
        const createdProduct: ProductFullModel = await productsRepository.getProductById(productId) as ProductFullModel;
        return responder.successResponse<ProductFullModel>({code: 201, message: createdProduct})
    } catch (e: any) {
        console.error(`Error on createProduct: ${JSON.stringify(e)}`);
        return responder.errorResponse<string>({code: 500, message: JSON.stringify(e)})
    }
}