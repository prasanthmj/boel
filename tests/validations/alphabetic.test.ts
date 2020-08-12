import Alphabetic from "../../src/Validations/Alphabetic";
import {makeBoel} from "../../src/BoelProvider";

describe("Alphabetic",()=>
{
    test("alphabetic test",()=>
    {
        let a = new Alphabetic();

        expect(a.validate('name', {name:'ANameWithOnlyAlphabetic'})).toEqual(true);
        expect(a.validate('name', {name:'ANameWith Spaces Spaces'})).toEqual(true);
        expect(a.validate('name', {name:'ANameWithNumber1'})).toEqual(false);
        expect(a.validate('name', {name:'ANameWithChar!'})).toEqual(false);

    });

    test("alphabetic No spaces",()=>
    {
        let a = new Alphabetic(/**allow spaces */ false);

        expect(a.validate('name', {name:'ANameWithOnlyAlphabetic'})).toEqual(true);
        expect(a.validate('name', {name:'ANameWith Spaces Spaces'})).toEqual(false);
    });

    test("Alphabetic Boel integration",()=>
    {
        let b = makeBoel();
        let res = b.validate([ b.field('name').isAlphabetic() ], {name:'NameWith11'});
        //console.log(" alphabetic test res", res);

        expect(res.has_errors).toBeTruthy();
        res.error_map && expect(res.error_map.name.validation).toEqual('Alphabetic');

        res.error_map && expect(res.error_map.name.message).not.toEqual('');
    })

})