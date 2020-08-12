import MinCount from "../../src/Validations/MinCount";
import {makeBoel} from "../../src/BoelProvider";

describe("MinCount",()=>
{
    test("Min count simple test",()=>
    {
        let min_count = new MinCount(3);

        expect(min_count.validate('options',{options:['Option 1','Option 2']})).toBeFalsy();
        expect(min_count.validate('options',
        {options:['Option 1','Option 2','Opt 3']})).toBeTruthy();
        
        expect(min_count.validate('options', {options:['Option 1','Option 2','']})).toBeTruthy();
        
        expect(min_count.validate('options',{options:['Option 1']})).toBeFalsy();

        expect(min_count.validate('options',{options:[]})).toBeFalsy();
    })

    test("MinCount integrated with boel",()=>
    {
        let b= makeBoel();
        let rules =[
            b.field("options").hasMinSelections(2)
        ];
        let res = b.validate(rules,{options:["item 1"]});
        expect(res.has_errors).toBeTruthy();
        res.error_map && expect(res.error_map.options.validation).toEqual('MinCount');

        res.error_map && expect(res.error_map.options.message).not.toEqual('');
    })
})