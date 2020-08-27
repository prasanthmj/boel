# BoelJS
Form Data validation library

**Note** : Work in progress

## Usage 

```js
let b = makeBoel();
const rules = [ 
    b.field('name').isRequired().minLength(5).maxLength(100),
    b.field('email').isEmail().isRequired(),
]

let res = b.validate(rules, formData)
if(res.has_errors){
    //res.error_map[field_ame].message contains the error message
    email_error = res.error_map.email.message
}
```
### Validate conditionally

```js
    b.field('age').isBetween(10,60).message("Age out of range").onlyWhen("paying_now==1"),

    /** Compare between fields */
    b.field('current_salary').isGreaterThan('prev_salary'),
```
### Shortcut for validating multiple fields, same validations
```js
/** multiple fields at the same time */
b.fields("name", "email").areRequired().maxLength(100);
// Fields name and email are required with maxlength 100 (for both fields)
```

## Customize/Translate Error message templates

```js
/** change/translate message templates for all validations */
b.updateMessages({
    'Required':"{{field}} is required", 
    "MaxLength":"The input shouldn't exceed {{max_length}} characters"
})

```

## Validations available by default

#### Required
For example:

```js
b.field("name").isRequired()

b.field("total").required()
```

#### MaxLength
checks the length of the input in characters
```js
b.field("name").maxLength(32)

b.field("email").checkMaxLength(23)
```
