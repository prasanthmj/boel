import { Validator, DataMap, ValidationResult, SimpleField } from "./types";
import { ValidatorInfoProvider } from "./FieldValidations";
import { ValidatorFactoryFn, ValidationFacade, ValidationExecutionInterface } from "./internal-types";
export default class Boel implements ValidatorInfoProvider {
    private validator_makers;
    private all_validators;
    addValidator(name: string | string[], vfatory: ValidatorFactoryFn): Boel;
    updateMessages(messages: {
        [validator: string]: string;
    }): void;
    field(field_name: string): ValidationFacade;
    fields(...fields: string[]): ValidationFacade;
    validate(rules: ValidationExecutionInterface[], data: DataMap): ValidationResult;
    validateFields(fields: SimpleField[], data: DataMap): ValidationResult;
    getMessageTemplate(validator: Validator): string;
}
