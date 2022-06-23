import {getProductsById} from '../handlers/getProductsById.js';
import {productList} from '../mocks/productListMocks';

describe('Test productById', () => {
    it('should return correct data', async () => {
        const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80a2';
        const mockEvent = {
            pathParameters: {
                productId: productId
            }
        };
        const productResult = productList.find(product => product.id === productId);
        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(productResult),
        }

        const result = await getProductsById(mockEvent);

        expect(result).toEqual(expectedResult);
    })

    it('should return error with status code 400', async () => {
        const productId = '';
        const mockEvent = {
            pathParameters: {
                productId: productId
            }
        };
        const expectedResult = {
            statusCode: 400,
            body: JSON.stringify({
                code: 400,
                message: 'Bad request'
            })
        }

        const result = await getProductsById(mockEvent);
        expect(result.statusCode).toEqual(expectedResult.statusCode);
        expect(result.body).toEqual(expectedResult.body);
    })

    it('should return error with status code 404', async () => {
        const productId = 'test';
        const mockEvent = {
            pathParameters: {
                productId: productId
            }
        };
        const expectedResult = {
            statusCode: 404,
            body: JSON.stringify({
                code: 404,
                message: `Product with id ${productId} is not found`
            })
        }

        const result = await getProductsById(mockEvent);
        expect(result.statusCode).toEqual(expectedResult.statusCode);
        expect(result.body).toEqual(expectedResult.body);
    })
})