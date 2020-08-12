import { DataMap, Validator } from "../types";
export default class FileExtension implements Validator {
    private extensions_str;
    readonly message = "Valid file extensions are: ${extensions_str}";
    private valid_extensions;
    constructor(extensions_str: string);
    validate(field_name: string, data: DataMap): boolean;
}
