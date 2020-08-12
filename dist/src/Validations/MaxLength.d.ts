import { DataMap, Validator } from "../types";
export default class MaxLength implements Validator {
    max_length: number;
    readonly message = "${field} exceeded max length ${max_length}";
    constructor(max_length: number);
    validate(field_name: string, data: DataMap): boolean;
}
