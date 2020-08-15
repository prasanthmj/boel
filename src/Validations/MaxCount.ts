import {DataMap, Validator} from "../types";

export default
class MaxCount implements Validator
{
    public readonly message="{{field}} selections exceeds max limit {{max_count}}";
    constructor(public max_count:number)
    {

    }
    validate(field_name:string, data:DataMap):boolean
    {
        if(typeof(data[field_name]) == 'undefined')
        {
            //won't validate if field is not present
            return true;
        }
        if(data[field_name].length > this.max_count)
        {
            return false;
        }
        return true;
    }
}