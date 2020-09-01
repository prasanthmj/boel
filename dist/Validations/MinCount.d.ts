import { DataMap, Validator } from "../types";
export default class MinCount implements Validator {
    min_count: number;
    readonly message = "For {{field}}, select at least {{min_count}} options";
    constructor(min_count: number);
    validate(field_name: string, data: DataMap): boolean;
}
