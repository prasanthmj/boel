import MaxCount from "../../src/Validations/MaxCount";
import {makeBoel} from "../../src/BoelProvider";

describe("MaxCount", ()=>
{
    test("maxcount test simple case",()=>
    {
        let max_count = new MaxCount(2);
        expect(max_count.validate('options', {options:["opt1","opt2","opt3"]})).toBeFalsy();
        expect(max_count.validate('options', {options:["opt1"]})).toBeTruthy();
        expect(max_count.validate('options', {options:[]})).toBeTruthy();
    })
    test("maxcount integrated with boel",()=>
    {
        let b = makeBoel();
        let rules =[
            b.field("options").hasMaxSelections(1)
        ]
        let res = b.validate(rules,{options:["item 1", "item 2","item 3"]});
        expect(res.has_errors).toBeTruthy();
        res.error_map && expect(res.error_map.options.validation).toEqual('MaxCount');

        res.error_map && expect(res.error_map.options.message).not.toEqual('');
    })
})