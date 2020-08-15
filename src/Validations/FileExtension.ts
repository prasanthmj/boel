import {DataMap, Validator} from "../types";

export default 
class FileExtension implements Validator
{
    public readonly message="Valid file extensions are: {{extensions_str}}";
    private valid_extensions:string[] = []
    
    constructor(private extensions_str:string)
    {
       this.valid_extensions = this.extensions_str.split(',').map((str)=>(str.trim()));
    }
    
    validate(field_name:string, data:DataMap)
    {
        if(data[field_name])
        {
            let ext = data[field_name].split('.').pop();
            
            if(!this.valid_extensions.includes(ext))
            {
                return false;
            }
        }
        return true;
    }
}