import Email from "../../src/Validations/Email";
import {makeBoel} from "../../src/BoelProvider";

describe("Email",()=>
{
    test("email address validation",()=>
    {
        let ev= new Email();

        expect(ev.validate('email',{email:"some.one@gmail.com"})).toEqual(true);
        expect(ev.validate('email',{email:"someone"})).toEqual(false);
        expect(ev.validate('email',{email:"some.one"})).toEqual(false);
        expect(ev.validate('email',{email:"some.one@"})).toEqual(false);
        expect(ev.validate('email',{email:"some.one@server@place.com"})).toEqual(false);

        expect(ev.validate('email',{email:"some.one@website.travel.guru"})).toEqual(true);

        expect(ev.validate('email',{email:"some.one@website.travel"})).toEqual(true);

        expect(ev.validate('email',{email:"person_x@f.guide"})).toEqual(true);
    })

    test("Email integration with Boel",()=>
    {
        let b = makeBoel();
        let rules=[
            b.field('email').isEmail()
        ];

        {
            let res = b.validate(rules, {email:'some'});
            //console.log(" Email validation result ", res);
            expect(res.has_errors).toBeTruthy();
            res.error_map && expect(res.error_map.email.validation).toEqual('Email');
        }

        {
            let res = b.validate(rules, {email:'some@website.com'});
            expect(res.has_errors).toBeFalsy();
        }

    })
})