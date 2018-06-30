import ExtendableError from 'es6-error'

export default class NetworkException extends ExtendableError{
    constructor(msg){
        super(msg);
    }
}