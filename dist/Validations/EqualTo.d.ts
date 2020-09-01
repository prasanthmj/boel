import { DataMap, Validator } from "../types";
export default class EqualTo implements Validator {
    test_value: string | number;
    readonly message = "{{field}} should be equal to {{test_value}}";
    constructor(test_value: string | number);
    validate(field_name: string, data: DataMap): boolean;
}
