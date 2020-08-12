
let b = makeBoel();
const rules = [ 
    b.field('name').isRequired().minLength(10).maxLength(100),
    b.field('email').isEmail().isRequired(),

    /** validate on condition */
    b.field('age').isBetween(10,60).message("Age out of range").onlyWhen("paying_now==1"),

    /** Compare between fields */
    b.field('current_salary').isGreaterThan('prev_salary'),
]

/** multiple fields at the same time */
b.fields("name", "email").areRequired().maxLength(100);

/** change/translate message templates for all validations */
b.updateMessages({
    'Required':"${field} is required", 
    "MaxLength":"The input shouldn't exceed ${max_length} characters"
})

/** Add your own validators */
b.addValidator('check_online',(param)=>
{
    validate(field_name, data)
    {
        return true;
    }
})

/** Generate rules from array of field info in JSON */

let b = makeBoel();
let rules = generateRules(fields)
let res = b.validate(rules, form_data)
