import {DataMap, Validator} from "../types";

export default 
class Alphabetic implements Validator
{
    public readonly message="{{field}} can contain only English alphabetic characters";
    constructor(public allow_space:boolean=true)
    {

    }
    validate(field_name:string, data:DataMap):boolean
    {
        let re = /^[A-Za-z]+$/i;
        if(this.allow_space)
        {
            re = /^[A-Za-z\s]+$/i;
        }
        return re.test(String(data[field_name]));
    }
}