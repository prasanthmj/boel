import { DataMap, Validator } from "../types";
interface ComparisonOptions {
    test_value?: number | string;
    test_field?: string;
}
export default class Comparison implements Validator {
    private comparison;
    private options;
    message: string;
    test_value: string | number;
    private test_against;
    name: string;
    constructor(comparison: string, options: ComparisonOptions);
    validate(field_name: string, data: DataMap): Boolean;
    private getOtherValue;
    doComparison(param1: number, param2: number): Boolean;
    doEqualTest(param1: number | string, param2: number | string): Boolean;
}
export {};
