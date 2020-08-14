/*
	
	Super-simple Mustache-style text-replacement.
	
	Example:
	var data = {name: "James", location: "Mars"};
	mustache("Welcome to {{location}}, {{ name }}.", data); // => Welcome to Mars, James.
	
*/

export function mustache(string:string, data:object){
	if (typeof(string) === "string" && typeof(data) === "object") {
		for (var key in data) {
			string = string.replace(new RegExp("{{\\s*" + key + "\\s*}}", "g"), (data as any)[key]);
		}
	};
	return string;
};