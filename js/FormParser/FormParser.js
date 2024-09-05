import { Response } from "../Response/Response.js";

const FormParser = {
    'error': 0,
    'response': Response,
    'fields': {
    },
    'parse': function (form){

        if(form.elements.length === 0){
            this.error = 1;
            this.response.error = this.error;
            this.response.message = '<span class="error">Unable to parse form fields.<br>Please constact support.</span>';
            return this.response;
        }

        for (const key in form.elements) {
            console.log(object[key]);

            switch (true) {
                case (form.elements[key.type] === "input"):
                    this.fields.
                    break;
                case (form.elements[key.type] === "textarea"):
                
                break;

                case (form.elements[key.type] === "xxxx"):
                
                break;
            
                default:
                    break;
            }
        }
        return fields;
    }
};

export {
    FormParser
}