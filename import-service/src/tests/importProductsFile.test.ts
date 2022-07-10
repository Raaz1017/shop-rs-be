import {ImportEventPayload, importProductsFile} from '../handlers/importProductsFile';
import {responder} from '../helpers/responder';
import {s3Repository} from '../dataAccess/S3Repository';

describe('Test importProductsFile',  () => {
    it('should throw error as fileName wrong', async function () {
        const mockedEvent: ImportEventPayload = {
            queryStringParameters: {
                name: 'fake'
            }
        } as unknown as ImportEventPayload;

        const expectedResult = responder.errorResponse<string>({code: 400, message: `File Type must be CSV`});
        const actualResult = await importProductsFile(mockedEvent);
        expect(actualResult).toEqual(expectedResult);
    });

    it('should successfully create signed url', async function () {
        const mockedEvent: ImportEventPayload = {
            queryStringParameters: {
                name: 'fake.csv'
            }
        } as unknown as ImportEventPayload;
        const fakeOfSignedUrl = 'fakeUrl';
        s3Repository.createSignedLink = jest.fn().mockImplementationOnce(() => fakeOfSignedUrl);

        const expectedResult = responder.successResponse<string>({code: 200, message: fakeOfSignedUrl});
        const actualResult = await importProductsFile(mockedEvent);
        expect(actualResult).toEqual(expectedResult);
    });
});