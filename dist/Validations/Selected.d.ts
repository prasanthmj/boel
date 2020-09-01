import { DataMap, Validator } from "../types";
export default class Selected implements Validator {
    readonly message = "{{field}} should be selected";
    validate(field_name: string, data: DataMap): boolean;
}
