import { DataMap, Validator } from "../types";
export default class MaxCount implements Validator {
    max_count: number;
    readonly message = "{{field}} selections exceeds max limit {{max_count}}";
    constructor(max_count: number);
    validate(field_name: string, data: DataMap): boolean;
}
