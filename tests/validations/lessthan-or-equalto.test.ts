import Comparison from "../../src/Validations/Comparison";
import {makeBoel} from "../../src/BoelProvider";

describe("LessThanOrEqualTo", ()=>
{
    test("less-than-or-equal test ",()=>
    {
        let lt = new Comparison('<=',{test_value:10});

        expect(lt.validate('weight', {weight:10})).toEqual(true);
        expect(lt.validate('weight', {weight:2})).toEqual(true);
        expect(lt.validate('weight', {weight:0.1})).toEqual(true);
        expect(lt.validate('weight', {weight:11})).toEqual(false);
        expect(lt.validate('weight', {weight:10.01})).toEqual(false);
        expect(lt.validate('weight', {weight:999})).toEqual(false);
    })

    test("less-than-or-equal test sign reversal",()=>
    {
        let lt = new Comparison('<=', {test_value:0});
        expect(lt.validate('weight', {weight:2})).toEqual(false);
        expect(lt.validate('weight', {weight:-12})).toEqual(true);

        expect(lt.validate('weight', {weight:0})).toEqual(true);
    })

     test("less-than-or-equal  integration with Boel",()=>
    {
        let b = makeBoel();
        let rules =[
            b.field('score').isLessThanOrEqualTo(100)
        ];
        {
            let res = b.validate(rules, {score: 101});
            expect(res.has_errors).toBeTruthy();
            res.error_map && expect(res.error_map.score.validation).toEqual('LessThanOrEqualTo');
        }
        {
            let res = b.validate(rules, {score: 100});
            expect(res.has_errors).toBeFalsy();          
        }

    }) 
});