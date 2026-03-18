import { ErrorCode } from "#/constants/error-codes";

export class HttpError extends Error{

    public status: ErrorCode;
    public message: string;
    
    constructor(status: ErrorCode, message: string){
        super(message);
        this.status = status;
        this.message = message;
    }

}

export class AuthError extends HttpError {
    code = 'AuthError';
    constructor(message: string){
        super(ErrorCode.AuthError, message);
    }
}