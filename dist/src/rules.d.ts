import { ValidationExecutionInterface } from "./internal-types";
import { ValidatorInfoProvider } from "./FieldValidations";
import { SimpleField } from "./types";
export declare function generateRules(fields: SimpleField[], infoP: ValidatorInfoProvider): ValidationExecutionInterface[];
