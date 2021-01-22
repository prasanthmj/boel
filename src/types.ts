import {FieldValidations} from "./FieldValidations";
export interface DataMap
{
    [field:string]:any
}

export interface Validator
{
    readonly name ?: string;
    readonly message ?: string;
    validate(field_name:string, data:DataMap):boolean;
}


export interface ErrorMap
{
    [field:string]:{validation:string, message:string}
}

export interface ValidationResult
{
    has_errors:boolean;
    error_map?:ErrorMap;
}


export type SimpleValidation={
    condition:"",
    message:"",
    [k:string]:string|number    
}

export type ValidationMap={
    [v:string]:SimpleValidation
}
export type SimpleField={
    name: string,
    type: string,
    validations: ValidationMap
}
