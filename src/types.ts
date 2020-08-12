import {FieldValidations} from "./FieldValidations";
export interface DataMap
{
    [field:string]:any
}

export interface Validator
{
    readonly name ?: string;
    readonly message ?: string;
    validate(field_name:string, data:DataMap):Boolean;
}


export interface ErrorMap
{
    [field:string]:{validation:string, message:string}
}

export interface ValidationResult
{
    has_errors:Boolean;
    error_map?:ErrorMap;
}


export type SimpleValidation={
    _vtype:string,
    condition:"",
    message:"",
    [k:string]:string|number    
}

export type SimpleField={
    name: string,
    type: string,
    validations: SimpleValidation[]
}
