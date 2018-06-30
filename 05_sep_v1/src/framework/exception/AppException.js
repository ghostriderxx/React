import ExtendableError from 'es6-error'

export default class AppException extends ExtendableError{
    constructor(msg){
        super(msg);
    }
}