import ExtendableError from 'es6-error'

export default class BusinessException extends ExtendableError{
    constructor(msg){
        super(msg);
    }
}