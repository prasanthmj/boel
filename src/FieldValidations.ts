import {Validator, DataMap, ErrorMap} from "./types";
import {Parser, Expression} from 'expr-eval';
import {getValidatorName} from "./utils";
import {ValidationExecutionInterface} from "./internal-types"

class ValidatorObj
{
    public validator:Validator;
    public message:string='';
    public condition_expr:Expression|null=null;

    constructor(validator:Validator)
    {
        this.validator = validator;
    }
    set condition(cond:string)
    {
        if(!cond)
        {
            this.condition_expr=null;
        }
        else
        {
            const parser = new Parser();
            this.condition_expr = parser.parse(cond);
        }
    }
}

export interface ValidatorInfoProvider
{
    getMessageTemplate(validator:Validator):string
}

export class FieldValidations implements ValidationExecutionInterface
{
    private validations:ValidatorObj[]=[];

    constructor(private fields:string[],
        private validator_info: ValidatorInfoProvider)
    {

    }
    addValidation(v:Validator)
    {
        this.validations.push( new ValidatorObj(v) );
    }
    addMessage(msg_templ:string)
    {
        if(this.validations.length > 0)
        {
            this.validations[this.validations.length-1].message = msg_templ;
        }
    }
    addCondition(condition:string)
    {
        if(this.validations.length > 0)
        {
            this.validations[this.validations.length-1].condition = condition;
        }
    }
    validate(data:DataMap):ErrorMap
    {
        let error_map:ErrorMap={};
        for(let validation of this.validations)
        {
            
            if(validation.condition_expr !== null)
            {
                const result = validation.condition_expr.evaluate(data);
                
                if(!result){ continue; }
            }

            for (let field of this.fields) 
            {
                //TODO: check the field is present in the data
                // Also check the validator check for undefined
                
                if (!validation.validator.validate(field, data)) 
                {
                    if (!error_map[field]) 
                    {
                        error_map[field] = { 
                            validation: getValidatorName(validation.validator) ,
                            message: this.getMessage(validation,field,data)
                        };
                    }
                }
            }
            
        }
        return error_map;
    }
    getMessage(validn:ValidatorObj, _field:string, _data:DataMap):string
    {
        let message_templ = '';
        if(validn.message)
        {
            message_templ= validn.message;
        }
        else
        {
            message_templ = this.validator_info.getMessageTemplate(validn.validator);
        }
        
        /*
        const var_names = ['field', ...Object.keys(validn.validator)];
        const var_values = [field, ...Object.values(validn.validator)];
        const fn = new Function(...var_names,"return `"+message_templ +"`;");
        const msg = fn(...var_values);
        
        */
        return message_templ;
    }
    public hasValidations():Boolean
    {
        return(this.validations.length > 0 ?true:false);
    }

}