import { Validator, DataMap, ErrorMap } from "./types";
import { Expression } from 'expr-eval';
import { ValidationExecutionInterface } from "./internal-types";
declare class ValidatorObj {
    validator: Validator;
    message: string;
    condition_expr: Expression | null;
    constructor(validator: Validator);
    set condition(cond: string);
}
export interface ValidatorInfoProvider {
    getMessageTemplate(validator: Validator): string;
}
export declare class FieldValidations implements ValidationExecutionInterface {
    private fields;
    private validator_info;
    private validations;
    constructor(fields: string[], validator_info: ValidatorInfoProvider);
    addValidation(v: Validator): void;
    addMessage(msg_templ: string): void;
    addCondition(condition: string): void;
    validate(data: DataMap): ErrorMap;
    getMessage(validn: ValidatorObj, field: string): string;
    hasValidations(): boolean;
}
export {};
