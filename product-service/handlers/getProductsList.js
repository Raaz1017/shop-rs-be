import {responder} from '../helpers/responder.js';
import {productListAsyncAdapter} from '../helpers/dataAdapter.js';

export async function getProductsList(event) {
    const products = await productListAsyncAdapter();

    return responder.successResponse({code: 200, message: products});
}