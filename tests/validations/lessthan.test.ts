import Comparison from "../../src/Validations/Comparison";
import {makeBoel} from "../../src/BoelProvider";

describe("LessThan", ()=>
{
    test("less-than test ",()=>
    {
        let lt = new Comparison('<',{test_value:10});

        expect(lt.validate('weight', {weight:10})).toEqual(false);
        expect(lt.validate('weight', {weight:2})).toEqual(true);
        expect(lt.validate('weight', {weight:0.1})).toEqual(true);
        expect(lt.validate('weight', {weight:11})).toEqual(false);
        expect(lt.validate('weight', {weight:10.01})).toEqual(false);
        expect(lt.validate('weight', {weight:999})).toEqual(false);
    })

    test("less-than test sign reversal",()=>
    {
        let lt = new Comparison('<', {test_value:0});
        expect(lt.validate('weight', {weight:2})).toEqual(false);
        expect(lt.validate('weight', {weight:-12})).toEqual(true);
    })

    test("less than integration with Boel",()=>
    {
        let b = makeBoel();
        let rules =[
            b.field('score').isLessThan(100)
        ];
        {
            let res = b.validate(rules, {score: 101});
            expect(res.has_errors).toBeTruthy();
        }
        {
            let res = b.validate(rules, {score: 99});
            expect(res.has_errors).toBeFalsy();          
        }

    })
});