import { DataMap, Validator } from "../types";
export default class AlphaNumeric implements Validator {
    allow_space: boolean;
    readonly message = "{{field}} can contain only alpha-numeric characters";
    constructor(allow_space?: boolean);
    validate(field_name: string, data: DataMap): boolean;
}
