import {DataMap, Validator} from "../types";

export default 
class AlphaNumeric implements Validator
{
    public readonly message="{{field}} can contain only alpha-numeric characters";
    constructor(public allow_space:Boolean=true)
    {

    }
    validate(field_name:string, data:DataMap)
    {
        let re = /^[A-Za-z0-9]+$/i;
        if(this.allow_space)
        {
            re = /^[A-Za-z0-9\s]+$/i;
        }
        return re.test(String(data[field_name]));
    }
}