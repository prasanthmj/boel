import Comparison from "../../src/Validations/Comparison";
import {makeBoel} from "../../src/BoelProvider";

describe("EqualToField", ()=>
{
    test("equal to field test ", ()=>
    {
        let eq = new Comparison('=', {test_field:'confirm_email'});

        expect(eq.validate('email', {email:'person1@website.com', 
            confirm_email:'pp@website.com'})).toEqual(false);
        
        expect(eq.validate('email', {email:'person1@website.com', 
            confirm_email:'person1@website.com'})).toEqual(true);
  
    })

    test("equalto field test with Boel", ()=>
    {
        let b = makeBoel();
        let rules=[
            b.field('confirm').isEqualToField("email")
        ];

        {
            let res = b.validate(rules, {email:'some-person@a-website.travel',
                 confirm:'sme-person@a-website.travel'});
            
            expect(res.has_errors).toBeTruthy();
            res.error_map && expect(res.error_map.confirm.validation).toEqual('EqualTo');
        }

        {
            let res = b.validate(rules, {email:'some-person@a-website.travel',
            confirm:'some-person@a-website.travel'});
            expect(res.has_errors).toBeFalsy();
        }

    })
})