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
        for(const v in f.validations)
        {
            const vx = f.validations[v]
            let validation = null;
            switch(v)
            {
                case "required":
                    validation = new Required();
                    break;
                case "maxlength":
                    validation = new MaxLength(+vx.size);
                    break;
                case "minlength":
                    validation = new MinLength(+vx.size);
                    break;
                case "LessThan":
                    validation = new Comparison('<', {test_value: +vx.num});
                    break;
                case "GreaterThan":
                    validation = new Comparison('>', {test_value: +vx.num});
                    break;
            }
            
            if(validation)
            {
                fv.addValidation(validation);
                vx.message && fv.addMessage(vx.message);
                vx.condition && fv.addCondition(vx.condition);
            }
        }
        if(fv.hasValidations())
        {
            retFvs.push(fv );
        }
        
    }
    return retFvs;
}