import {responder} from '../helpers/responder.js';
import {productListAsyncAdapter} from '../helpers/dataAdapter.js';

export async function getProductsById(event) {
    const {productId} = event?.pathParameters;

    if (!productId?.length) {
        return responder.errorResponse({code: 400, message: 'Bad request'});
    }
    const products = await productListAsyncAdapter();
    const parsedProductList = JSON.parse(JSON.stringify(products));
    const product = parsedProductList.find(product => product.id === productId);

    if (!product) {
        return responder.errorResponse({code: 404, message: `Product with id ${productId} is not found`});
    }

    return responder.successResponse({code: 200, message: product});
}