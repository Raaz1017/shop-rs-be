import {getProductsList} from '../handlers/getProductsList';
import {productList} from '../mocks/productListMocks';

describe('get list of all products', () => {
    it('should return correct list', async function () {
        const actualResult = await getProductsList();
        expect(actualResult.statusCode).toEqual(200);
        expect(actualResult.body).toEqual(JSON.stringify(productList));
    });
})