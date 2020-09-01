import { DataMap, Validator } from "../types";
export default class Alphabetic implements Validator {
    allow_space: boolean;
    readonly message = "{{field}} can contain only English alphabetic characters";
    constructor(allow_space?: boolean);
    validate(field_name: string, data: DataMap): boolean;
}
