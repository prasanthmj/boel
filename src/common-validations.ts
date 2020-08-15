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

        .addValidator(["maxLength","checkMaxLength"], (max:number)=> new MaxLength(max))

        .addValidator(["minLength","checkMinLength"], (min:number)=> new MinLength(min))

        .addValidator(["isAlphabetic","areAlphabetic"], 
                (allow_spaces=true)=> new Alphabetic(allow_spaces))

        .addValidator(["isAlphaNumeric","areAlphaNumeric"], 
                (allow_spaces=true)=> new AlphaNumeric(allow_spaces))

        .addValidator(["isEmail","areEmails"], ()=>new Email())

        .addValidator(["lessThan","isLessThan","areLessThan"], 
                (num:number)=>new Comparison('<',{test_value:num}))

        .addValidator(["lessThanOrEqualTo","isLessThanOrEqualTo","areLessThanOrEqualTo"], 
                (num:number)=>new Comparison('<=',{test_value:num}))

        .addValidator(["greaterThan","isGreaterThan","areGreaterThan"], 
                (num:number)=>new Comparison('>',{test_value:num}))

        .addValidator(["greaterThanOrEqualTo","isGreaterThanOrEqualTo","areGreaterThanOrEqualTo"], 
                (num:number)=>new Comparison('>=', {test_value:num}))

        .addValidator(["equalsTo", "isEqualTo","areEqualTo"], 
                (other:number|string)=>new Comparison('=',{test_value:other}))

        .addValidator(["notEqualTo", "isNotEqualTo","areNotEqualTo"], 
                (other:number|string)=>new Comparison('!=',{test_value:other}))

        .addValidator(["lessThanField","isLessThanField","areLessThanField"], 
                (other_field:string)=>new Comparison('<',{test_field:other_field}))
        
        .addValidator(["lessThanOrEqualToField","isLessThanOrEqualToField","areLessThanOrEqualToField"], 
                (other_field:string)=>new Comparison('<=',{test_field:other_field}))

        .addValidator(["greaterThanField","isGreaterThanField","areGreaterThanField"], 
                (other_field:string)=>new Comparison('>',{test_field:other_field}))
        
        .addValidator(["greaterThanOrEqualToField","isGreaterThanOrEqualToField",
        "areGreaterThanOrEqualToField"], 
                (other_field:string)=>new Comparison('>=',{test_field:other_field}))
        
        .addValidator(["equalsToField", "isEqualToField","areEqualToField"], 
                (other_field:string)=>new Comparison('=',{test_field:other_field}))

        .addValidator(["notEqualsToField", "isNotEqualToField","areNotEqualToField"], 
                (other_field:string)=>new Comparison('!=',{test_field:other_field}))

        .addValidator(["maxSelections", "hasMaxSelections"], 
                (max:number)=>new MaxCount(max))

        .addValidator(["minSelections", "hasMinSelections"], 
                (min:number)=>new MinCount(min))
        
        .addValidator(["shouldBeSelected", "isSelected","selected"], 
                ()=>new Selected())
        
        .addValidator(["hasExtension","hasFileExtension"], 
                (extensions:string)=>new FileExtension(extensions))
        
    return boel;
}