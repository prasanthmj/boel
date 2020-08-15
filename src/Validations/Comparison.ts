import {DataMap, Validator} from "../types";

interface ComparisonMap
{
    [cmp:string]:{ name:string, message:string, fn:(a:number|string,b:number|string)=>Boolean}
}
const comparison_operators:ComparisonMap=
{
    '<':{
            name:'LessThan',
            message:"{{field}} should be less than {{test_value}}",
            fn:(a,b)=>(a < b)
        },
    '<=':
        {
            name:'LessThanOrEqualTo',
            message:"{{field}} should be less than or equal to {{test_value}}",
            fn:(a,b)=>(a <= b)
        }, 
        '>':
        {
            name:'GreaterThan',
            message:"{{field}} should be greater than {{test_value}}",
            fn:(a,b)=>(a > b)
        },
        '>=':
        {
            name: 'GreaterThanOrEqualTo',
            message:"{{field}} should be greater than or equal to {{test_value}}",
            fn:(a,b)=>(a >= b)
        },
        '=':
        {
            name: 'EqualTo',
            message:"{{field}} should be equal to {{test_value}}",
            fn:(a,b)=>(a === b)
        },
        '!=':
        {
            name: 'NotEqualTo',
            message: "{{field}} should not be equal to {{test_value}}",
            fn:(a,b)=>(a !== b)
        }
};

interface ComparisonOptions
{
    test_value ?:number|string,
    test_field ?: string
}

enum TestType{ Value, Field };

export default 
class Comparison implements Validator
{
    public message="";
    public test_value:string|number=0;
    private test_against= TestType.Value;
    public name:string="";
    
    constructor(private comparison:string,private options:ComparisonOptions)
    {
        let operators = Object.keys(comparison_operators);
        if(!operators.includes(comparison))
        {
            throw Error(`unsupported comparison operator ${comparison}`);
        }
        this.name = comparison_operators[comparison].name;
        this.message = comparison_operators[comparison].message;
        if(typeof(options.test_value) != 'undefined' )
        {
            this.test_against = TestType.Value;
            this.test_value = options.test_value;
        }
        else if(typeof(options.test_field) != 'undefined' )
        {
            this.test_against = TestType.Field;
            this.test_value = options.test_field;
        }
        else
        {
            throw Error("Provide one of test_value or test_field in the options");
        }
        

    }
    validate(field_name:string, data:DataMap):Boolean
    {
        let value = this.getOtherValue(data);

        if(this.comparison == '=' || this.comparison == '!=')
        {
            return this.doEqualTest(data[field_name], value);
        }
        else
        {
            return this.doComparison(Number(data[field_name]), Number(value));
        }
        
    }
    private getOtherValue(data:DataMap):number|string
    {
        if(this.test_against == TestType.Field )
        {
            //This conditions shouldn't happen since the test is already done in contrsuctor. But typescript doesn't know that
            if(typeof(this.options.test_field) == 'undefined'){ throw Error("The test_field is not provided") } ;

            return data[this.options.test_field];
        }   
        else
        {
            if(typeof(this.options.test_value) == 'undefined'){ throw Error("The test_value is not provided") } ;

            return(this.options.test_value);
        }
    }
    doComparison(param1:number, param2:number)
    {
        return comparison_operators[this.comparison].fn(param1, param2);
    }
    doEqualTest(param1:number|string, param2:number|string)
    {
        return comparison_operators[this.comparison].fn(param1, param2);
    }

}