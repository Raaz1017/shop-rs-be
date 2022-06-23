export class Responder {
    errorResponse({code, message}) {
        const responseBody = this.getErrorBody(code, message);

        return {
            statusCode: code,
            body: JSON.stringify(responseBody),
        }
    }

    successResponse({code, message}) {
        return {
            statusCode: code,
            body: JSON.stringify(message)
        }
    }

    getErrorBody(code, message) {
        return {
            code: code,
            message: message
        }
    }
}

export const responder = new Responder();