import { DataMap, Validator } from "../types";
export default class MinLength implements Validator {
    min_length: number;
    readonly message = "{{field}} input length should be at least {{min_length}}";
    constructor(min_length: number);
    validate(field_name: string, data: DataMap): boolean;
}
