import { FieldValidations } from "./FieldValidations";
import { ValidationSupportInterface, ValidationFacade, ValidationExecutionInterface } from "./internal-types";
import { Validator, DataMap, ErrorMap } from "./types";
export declare class FieldValidationsWrapper implements ValidationSupportInterface, ValidationExecutionInterface {
    private field_v;
    constructor(field_v: FieldValidations);
    addValidation(v: Validator): void;
    validate(data: DataMap): ErrorMap;
    message(m: string): ValidationFacade;
    onlyWhen(condition: string): ValidationFacade;
}
