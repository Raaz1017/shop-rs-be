import {responder} from '../helpers/responder';
import {productListAsyncAdapter} from '../helpers/dataAdapter';
import {APIGatewayEvent} from 'aws-lambda';

export async function getProductsById(event: APIGatewayEvent) {
    const {productId} = event?.pathParameters as {productId: string};

    if (!productId?.length) {
        return responder.errorResponse({code: 400, message: 'Bad request'});
    }
    const products = await productListAsyncAdapter();
    const parsedProductList = JSON.parse(JSON.stringify(products));
    const product = parsedProductList.find((product: any) => product.id === productId);

    if (!product) {
        return responder.errorResponse({code: 404, message: `Product with id ${productId} is not found`});
    }

    return responder.successResponse({code: 200, message: product});
}