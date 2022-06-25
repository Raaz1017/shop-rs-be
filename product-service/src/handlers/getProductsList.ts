import {responder} from '../helpers/responder';
import {productListAsyncAdapter} from '../helpers/dataAdapter';

export async function getProductsList() {
    const products = await productListAsyncAdapter();

    return responder.successResponse({code: 200, message: products});
}