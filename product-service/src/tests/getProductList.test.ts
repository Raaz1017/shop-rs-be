import {getProductsList} from '../handlers/getProductsList';
import {productList} from '../mocks/productListMocks';
import {APIGatewayEvent} from 'aws-lambda';

describe('get list of all products', () => {
    it('should return correct list', async function () {
        const event = {} as APIGatewayEvent;
        const actualResult = await getProductsList(event);
        expect(actualResult.statusCode).toEqual(200);
        expect(actualResult.body).toEqual(JSON.stringify(productList));
    });
})