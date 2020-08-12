import { DataMap, Validator } from "../types";
export default class Required implements Validator {
    readonly message = "${field} is required";
    validate(field_name: string, data: DataMap): boolean;
}
