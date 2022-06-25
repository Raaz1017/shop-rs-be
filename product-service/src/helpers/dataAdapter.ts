import {productList} from '../mocks/productListMocks';

export async function productListAsyncAdapter() {
    return new Promise((resolve) => {
        resolve(productList);
    })
}