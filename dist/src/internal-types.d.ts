import { Validator, DataMap, ErrorMap } from "./types";
export interface ValidationSupportInterface {
    addValidation(v: Validator): void;
    message(m: string): ValidationFacade;
    onlyWhen(condition: string): ValidationFacade;
}
export interface ValidationExecutionInterface {
    validate(data: DataMap): ErrorMap;
}
export declare type ValidatorFactoryFn = (...args: any[]) => Validator;
export declare type ValidationFacade = ValidationSupportInterface & ValidatorMakerMap & ValidationExecutionInterface;
export declare type ValidatorWrapperFn = (...args: any[]) => ValidationFacade;
export interface ValidatorMakerMap {
    [name: string]: ValidatorWrapperFn;
}
export interface ValidatorInfoMap {
    [field: string]: {
        message?: string;
    };
}
