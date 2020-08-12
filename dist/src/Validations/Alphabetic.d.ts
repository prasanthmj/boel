import { DataMap, Validator } from "../types";
export default class Alphabetic implements Validator {
    allow_space: Boolean;
    readonly message = "${field} can contain only English alphabetic characters";
    constructor(allow_space?: Boolean);
    validate(field_name: string, data: DataMap): boolean;
}
