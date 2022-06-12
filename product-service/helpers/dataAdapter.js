import {productList} from '../mocks/productListMocks.js';

export async function productListAsyncAdapter() {
    return new Promise((resolve) => {
        resolve(productList);
    })
}