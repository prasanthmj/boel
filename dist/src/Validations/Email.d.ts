import { DataMap, Validator } from "../types";
export default class Email implements Validator {
    readonly message = "Please provide a valid email address";
    constructor();
    validate(field_name: string, data: DataMap): boolean;
}
