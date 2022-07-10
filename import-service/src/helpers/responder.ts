interface ResponderPayload<T> {
    code: number,
    message: T
}

interface ErrorBodyPayload<T> {
    code: number,
    message: T
}

export class Responder {
    private readonly defaultHeader = {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
    };

    public errorResponse<T>({code, message}: ResponderPayload<T>) {
        const responseBody = this.getErrorBody<T>(code, message);

        return {
            statusCode: code,
            body: JSON.stringify(responseBody),
            headers: this.defaultHeader,
        }
    }

    public successResponse<T>({code, message}: ResponderPayload<T>) {
        return {
            statusCode: code,
            body: JSON.stringify(message),
            headers: this.defaultHeader,
        }
    }

    private getErrorBody<T>(code: number, message: T): ErrorBodyPayload<T>{
        return {
            code: code,
            message: message
        }
    }
}

export const responder = new Responder();