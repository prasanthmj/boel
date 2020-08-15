import Required from "./Validations/required";
import MaxLength from "./Validations/MaxLength";
import MinLength from "./Validations/MinLength";
import Comparison from "./Validations/Comparison";

import {ValidationExecutionInterface} from "./internal-types";
import {FieldValidations, ValidatorInfoProvider} from "./FieldValidations";
import {SimpleField} from "./types";

export function generateRules(fields:SimpleField[], infoP:ValidatorInfoProvider):ValidationExecutionInterface[]
{
    const retFvs:ValidationExecutionInterface[] = [] 
    for(const f of fields)
    {
        const fv = new FieldValidations([f.name], infoP)
        for(const v of f.validations)
        {
            let validation = null;
            switch(v._vtype)
            {
                case "Required":
                    validation = new Required();
                    break;
                case "MaxLength":
                    validation = new MaxLength(+v.size);
                    break;
                case "MinLength":
                    validation = new MinLength(+v.size);
                    break;
                case "LessThan":
                    validation = new Comparison('<', {test_value: +v.num});
                    break;
                case "GreaterThan":
                    validation = new Comparison('>', {test_value: +v.num});
                    break;
            }
            
            if(validation)
            {
                fv.addValidation(validation);
                v.message && fv.addMessage(v.message);
                v.condition && fv.addCondition(v.condition);
            }
        }
        if(fv.hasValidations())
        {
            retFvs.push(fv );
        }
        
    }
    return retFvs;
}