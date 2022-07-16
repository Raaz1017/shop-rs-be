import {getProductsById} from '../handlers/getProductsById';
import {productList} from '../mocks/productListMocks';
import {APIGatewayEvent} from 'aws-lambda';
import {productsRepository} from '../dataAccess/productsRepository';
import {responder} from '../helpers/responder';

describe('Test productById', () => {
    it('should return correct data', async () => {
        const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80a2';
        const mockEvent = {
            pathParameters: {
                productId: productId
            }
        } as unknown as APIGatewayEvent;
        const productResult = productList.find(product => product.id === productId);
        const expectedResult = responder.successResponse({code: 200, message:productResult });

        productsRepository.getProductById = jest.fn().mockImplementationOnce(() => productResult);

        const result = await getProductsById(mockEvent);

        expect(result).toEqual(expectedResult);
    })

    it('should return error with status code 400', async () => {
        const productId = '';
        const mockEvent = {
            pathParameters: {
                productId: productId
            }
        } as unknown as APIGatewayEvent;
        const expectedResult = responder.errorResponse({message: 'Bad request', code: 400})

        const result = await getProductsById(mockEvent);
        expect(result.statusCode).toEqual(expectedResult.statusCode);
        expect(result.body).toEqual(expectedResult.body);
    })

    it('should return error with status code 404', async () => {
        const productId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        const mockEvent = {
            pathParameters: {
                productId: productId
            }
        } as unknown as APIGatewayEvent;
        const expectedResult = {
            statusCode: 404,
            body: JSON.stringify({
                code: 404,
                message: `Product with id ${productId} is not found`
            })
        }
        productsRepository.getProductById = jest.fn().mockImplementationOnce(() => null);

        const result = await getProductsById(mockEvent);
        expect(result.statusCode).toEqual(expectedResult.statusCode);
        expect(result.body).toEqual(expectedResult.body);
    })
})