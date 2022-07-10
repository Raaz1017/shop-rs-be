import {productList} from '../mocks/productListMocks';
import {productsRepository} from '../dataAccess/productsRepository';
import {createProductSNSRepository} from '../dataAccess/SNSRepository';
import {catalogBatchProcess} from '../handlers/catalogBatchProcess';
import {SQSEvent} from 'aws-lambda';


describe('Test catalogBatchProcess', () => {
    it('should successfully save all data', async function () {
        const firstProduct = {
            title: productList[0].title,
            count: productList[0].count,
            price: productList[0].price,
            description: productList[0].description
        };
        const secondProduct = {
            title: productList[1].title,
            count: productList[1].count,
            price: productList[1].price,
            description: productList[1].description
        }

        const fakeEvent = {
            Records: [{
                body: JSON.stringify(firstProduct),
            }, {
                body: JSON.stringify(secondProduct),
            }]
        } as unknown as SQSEvent;

        const createProductMockDB = productsRepository.createProduct = jest.fn().mockImplementation(async () => Promise.resolve('fake'));
        const createProductSns = createProductSNSRepository.sendEvent = jest.fn().mockImplementation(async () => Promise.resolve('fake'));

        await catalogBatchProcess(fakeEvent);
        expect(createProductMockDB).toHaveBeenCalledTimes(2);
        expect(createProductSns).toHaveBeenCalledTimes(1);
    });

    it('should successfully save only one product', async function () {
        const firstProduct = {
            title: productList[0].title,
            count: productList[0].count,
            price: productList[0].price,
            description: productList[0].description
        };
        const secondProduct = {
            title: productList[1].title,
            count: productList[1].count,
            price: productList[1].price,
            description: productList[1].description,
            id: productList[1].id
        }

        const fakeEvent = {
            Records: [{
                body: JSON.stringify(firstProduct),
            }, {
                body: JSON.stringify(secondProduct),
            }]
        } as unknown as SQSEvent;

        const createProductMockDB = productsRepository.createProduct = jest.fn().mockImplementation(async () => Promise.resolve('fake'));
        const createProductSns = createProductSNSRepository.sendEvent = jest.fn().mockImplementation(async () => Promise.resolve('fake'));

        await catalogBatchProcess(fakeEvent);
        expect(createProductMockDB).toHaveBeenCalledTimes(1);
        expect(createProductSns).toHaveBeenCalledTimes(1);
    });

    it(`shouldn't save any product`, async function () {
        const firstProduct = {};
        const secondProduct = {}

        const fakeEvent = {
            Records: [{
                body: JSON.stringify(firstProduct),
            }, {
                body: JSON.stringify(secondProduct),
            }]
        } as unknown as SQSEvent;

        const createProductMockDB = productsRepository.createProduct = jest.fn().mockImplementation(async () => Promise.resolve('fake'));
        const createProductSns = createProductSNSRepository.sendEvent = jest.fn().mockImplementation(async () => Promise.resolve('fake'));

        await catalogBatchProcess(fakeEvent);
        expect(createProductMockDB).toHaveBeenCalledTimes(0);
        expect(createProductSns).toHaveBeenCalledTimes(0);
    });
})