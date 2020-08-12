import {generateRules} from "../src/rules";
import {makeBoel} from "../src/BoelProvider";
import {ValidatorInfoProvider} from "../src/FieldValidations";
import {Validator} from "../src/types";

var txt_settings='{"fields":[{"name":"name","type":"text","validations":[{"_vtype":"Required","condition":"","enabled":true,"message":""}]},{"name":"email","type":"text","validations":[{"_vtype":"Required","condition":"","enabled":true,"message":""}]},{"name":"Age","type":"number","validations":[{"_vtype":"GreaterThan","condition":"","message":"","num":"15"},{"_vtype":"LessThan","condition":"","message":"","num":"60"}]}]}';

var txt_settings2='{"fields":[{"name":"name","type":"text","validations":[{"_vtype":"Required","condition":"","enabled":true,"message":""},{"_vtype":"MaxLength","condition":"","message":"some error message for maxlen","size":"5"}]},{"name":"email","type":"text","validations":[{"_vtype":"Required","condition":"","enabled":true,"message":""}]},{"name":"Age","type":"number","validations":[{"_vtype":"GreaterThan","condition":"","message":"","num":"15"},{"_vtype":"LessThan","condition":"","message":"","num":"60"}]}]}'
class MockMessages implements ValidatorInfoProvider
{
    getMessageTemplate(validator:Validator):string{
        return ""
    }
}
var mockMessages = new MockMessages()

describe("generaterules", ()=>
{
    test("required",()=>
    {
        let settings = JSON.parse(txt_settings);
        let rules = generateRules(settings.fields, mockMessages);
        let b = makeBoel();
        let res = b.validate(rules, {});
        console.log("validation results ", res);
        expect(res.has_errors).toEqual(true);
        if(res.error_map)
        {
            expect(res.error_map.name.validation).toEqual("Required"); 
            expect(res.error_map.email.validation).toEqual("Required");
        }
    });
    
    test("maxlen",()=>
    {
        let settings = JSON.parse(txt_settings2);
        let rules = generateRules(settings.fields, mockMessages);
        let b = makeBoel();
        let res = b.validate(rules, {name:"a very very long name", email:"some@website.com"});
        console.log("validation results ", res);
        expect(res.has_errors).toEqual(true);
        if(res.error_map)
        {
            expect(res.error_map.name.validation).toEqual("MaxLength");
            expect(res.error_map.name.message).toEqual("some error message for maxlen"); 
        }
    })
})