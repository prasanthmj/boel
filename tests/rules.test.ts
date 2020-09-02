import {makeBoel} from "../src/BoelProvider";


const txt_settings = `{"fields":[{"id":"sEUp4g6li","name":"name","type":"text","validations":[{"message":"","condition":"","enabled":true,"_vtype":"Required"}],"__type":"text"},{"id":"LsWOBpjNR","name":"email","type":"text","validations":[{"message":"","condition":"","enabled":true,"_vtype":"Required"}],"__type":"text"}]}`


//var txt_settings='{"fields":[{"name":"name","type":"text","validations":[{"_vtype":"Required","condition":"","enabled":true,"message":""}]},{"name":"email","type":"text","validations":[{"_vtype":"Required","condition":"","enabled":true,"message":""}]},{"name":"Age","type":"number","validations":[{"_vtype":"GreaterThan","condition":"","message":"","num":"15"},{"_vtype":"LessThan","condition":"","message":"","num":"60"}]}]}';

const txt_settings2='{"fields":[{"name":"name","type":"text","validations":[{"_vtype":"Required","condition":"","enabled":true,"message":""},{"_vtype":"MaxLength","condition":"","message":"some error message for maxlen","size":"5"}]},{"name":"email","type":"text","validations":[{"_vtype":"Required","condition":"","enabled":true,"message":""}]},{"name":"Age","type":"number","validations":[{"_vtype":"GreaterThan","condition":"","message":"","num":"15"},{"_vtype":"LessThan","condition":"","message":"","num":"60"}]}]}'

describe("validateFields", ()=>
{
    test("required",()=>
    {
        const settings = JSON.parse(txt_settings);
        let b = makeBoel();
        
        let res = b.validateFields(settings.fields, {});
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
        let b = makeBoel();
        
        //let rules = generateRules(settings.fields, b);
        
        let res = b.validateFields(settings.fields, {name:"a very very long name", email:"some@website.com"});
        console.log("validation results ", res);
        expect(res.has_errors).toEqual(true);
        if(res.error_map)
        {
            expect(res.error_map.name.validation).toEqual("MaxLength");
            expect(res.error_map.name.message).toEqual("some error message for maxlen"); 
        }
    })
})