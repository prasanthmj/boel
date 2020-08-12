import Selected from "../../src/Validations/Selected";
import {DataMap} from "../../src/types";
import {makeBoel} from "../../src/entry";


describe("Selected",()=>
{
    test("triggers when not present",()=>
    {
        let s = new Selected();
        expect(s.validate('option',{name:'Someone'})).toBe(false);
        expect(s.validate('option',{})).toBe(false);
        expect(s.validate('option',{name:'Someone',option:''})).toBe(false);
        expect(s.validate('option',{name:'Someone',option:0})).toBe(false);
        expect(s.validate('option',{name:'Someone',option:true})).toBe(true);
    })

    test("selected integrated with boel",()=>
    {
        let b =  makeBoel();
        let rules = [
            b.field("agree").isSelected().message("Can't proceed since you didn't agree to the terms")
        ];

        {
            let res = b.validate(rules,{name:'John',agree:false});
            expect(res.has_errors).toBeTruthy();
            res.error_map && expect(res.error_map.agree.validation).toEqual('Selected');
        }

        {
            let res = b.validate(rules,{name:'John',agree:true});
            expect(res.has_errors).toBeFalsy();
        }        
    })
})