interface ResponderPayload {
    code: number,
    message: any
}

export class Responder {
    errorResponse({code, message}: ResponderPayload) {
        const responseBody = this.getErrorBody(code, message);

        return {
            statusCode: code,
            body: JSON.stringify(responseBody),
        }
    }

    successResponse({code, message}: ResponderPayload) {
        return {
            statusCode: code,
            body: JSON.stringify(message)
        }
    }

    getErrorBody(code: number, message: string) {
        return {
            code: code,
            message: message
        }
    }
}

export const responder = new Responder();