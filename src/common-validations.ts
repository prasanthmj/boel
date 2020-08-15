import Boel from "./Boel";
import Required from "./Validations/required";
import MaxLength from "./Validations/MaxLength";
import MinLength from "./Validations/MinLength";
import Alphabetic from "./Validations/Alphabetic";
import AlphaNumeric from "./Validations/AlphaNumeric";
import Email from "./Validations/Email";
import Comparison from "./Validations/Comparison";
import MaxCount from "./Validations/MaxCount";
import MinCount from "./Validations/MinCount";
import Selected from "./Validations/Selected";
import FileExtension from "./Validations/FileExtension";


export function add_common_validations(boel:Boel):Boel
{
    boel.addValidator(["isRequired","areRequired","required"], ()=>new Required)

        .addValidator(["maxLength","checkMaxLength"], 
                (max:unknown)=>(typeof max == "number" ? new MaxLength(max): null) )

        .addValidator(["minLength","checkMinLength"], 
                (min:unknown)=>(typeof min == "number" ? new MinLength(min):null))

        .addValidator(["isAlphabetic","areAlphabetic"], 
                (allow_spaces=true)=>( new Alphabetic(<boolean>allow_spaces)) )

        .addValidator(["isAlphaNumeric","areAlphaNumeric"], 
                (allow_spaces=true)=> new AlphaNumeric(<boolean>allow_spaces))

        .addValidator(["isEmail","areEmails"], ()=>new Email())

        .addValidator(["lessThan","isLessThan","areLessThan"], 
                (num:unknown)=>
                (typeof(num) == "number" ? new Comparison('<',{test_value:num}): null))

        .addValidator(["lessThanOrEqualTo","isLessThanOrEqualTo","areLessThanOrEqualTo"], 
                (num:unknown)=>
                (typeof(num) == "number" ? new Comparison('<=',{test_value:num}): null))
                

        .addValidator(["greaterThan","isGreaterThan","areGreaterThan"], 
                (num:unknown)=>
                (typeof(num) == "number" ? new Comparison('>',{test_value:num}): null))

        .addValidator(["greaterThanOrEqualTo","isGreaterThanOrEqualTo","areGreaterThanOrEqualTo"], 
                (num:unknown)=>
                (typeof(num) == "number" ? new Comparison('>=',{test_value:num}): null))

        .addValidator(["equalsTo", "isEqualTo","areEqualTo"], 
                (other:unknown)=>
                (typeof(other) == "number"||typeof(other) == "string" ? new Comparison('=',{test_value: other}): null))

        .addValidator(["notEqualTo", "isNotEqualTo","areNotEqualTo"], 
                (other:unknown)=>
                (typeof(other) == "number"||typeof(other) == "string" ? new Comparison('!=',{test_value:other}): null))

        .addValidator(["lessThanField","isLessThanField","areLessThanField"], 
                (other_field:unknown)=>
                (typeof(other_field) == "string" ? new Comparison('<',{test_field:other_field}) :null))
        
        .addValidator(["lessThanOrEqualToField","isLessThanOrEqualToField","areLessThanOrEqualToField"], 
        (other_field:unknown)=>
        (typeof(other_field) == "string" ? new Comparison('<=',{test_field:other_field}) :null))

        .addValidator(["greaterThanField","isGreaterThanField","areGreaterThanField"],
        (other_field:unknown)=>
        (typeof(other_field) == "string" ? new Comparison('>',{test_field:other_field}) :null)) 
        
        .addValidator(["greaterThanOrEqualToField","isGreaterThanOrEqualToField",
        "areGreaterThanOrEqualToField"], 
        (other_field:unknown)=>
        (typeof(other_field) == "string" ? new Comparison('>=',{test_field:other_field}) :null))
        
        .addValidator(["equalsToField", "isEqualToField","areEqualToField"], 
        (other_field:unknown)=>
        (typeof(other_field) == "string" ? new Comparison('=',{test_field:other_field}) :null))

        .addValidator(["notEqualsToField", "isNotEqualToField","areNotEqualToField"],
        (other_field:unknown)=>
        (typeof(other_field) == "string" ? new Comparison('!=',{test_field:other_field}) :null)) 

        .addValidator(["maxSelections", "hasMaxSelections"],
        (max:unknown)=>(typeof max == "number" ? new MaxCount(max):null)) 

        .addValidator(["minSelections", "hasMinSelections"], 
        (min:unknown)=>(typeof min == "number" ? new MinCount(min):null)) 
        
        .addValidator(["shouldBeSelected", "isSelected","selected"], 
                ()=>new Selected())
        
        .addValidator(["hasExtension","hasFileExtension"], 
        (extensions : unknown) =>(typeof(extensions)=="string"?new FileExtension(extensions): null));
        
    return boel;
}