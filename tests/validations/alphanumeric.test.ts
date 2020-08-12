import AlphaNumeric from "../../src/Validations/AlphaNumeric";
import {makeBoel} from "../../src/BoelProvider";

describe("AlphaNumeric",()=>
{
    test("alphanumeric test",()=>
    {
        let a = new AlphaNumeric();

        expect(a.validate('name', {name:'ANameWithOnlyAlphabetic'})).toEqual(true);
        expect(a.validate('name', {name:'ANameWith Spaces Spaces'})).toEqual(true);
        expect(a.validate('name', {name:'ANameWithNumber1'})).toEqual(true);
        expect(a.validate('name', {name:'11223344'})).toEqual(true);
        expect(a.validate('name', {name:'112 2 3344'})).toEqual(true);
        expect(a.validate('name', {name:'ANameWithChar!'})).toEqual(false);
        expect(a.validate('name', {name:'@!'})).toEqual(false);

    });

    test("alphanumeric No spaces",()=>
    {
        let a = new AlphaNumeric(/**allow spaces */ false);

        expect(a.validate('name', {name:'ANameWithOnlyAlphabetic'})).toEqual(true);
        expect(a.validate('name', {name:'ANameWith11'})).toEqual(true);
        expect(a.validate('name', {name:'ANameWith 22 Spaces Spaces'})).toEqual(false);
    });

    test("AlphaNumeric Boel integration",()=>
    {
        let b = makeBoel();
        let res = b.validate([ b.field('name').isAlphaNumeric() ], {name:'NameWith11'});
        //console.log(" alphabetic test res", res);

        expect(res.has_errors).toBeFalsy();
       
        let res2 = b.validate([ b.field('name').isAlphaNumeric() ], {name:'Name#With11'});

        expect(res2.has_errors).toBeTruthy();

        res2.error_map && expect(res2.error_map.name.validation).toEqual('AlphaNumeric');
    })

})