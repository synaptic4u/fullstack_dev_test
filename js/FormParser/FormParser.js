import { Response } from "../Response/Response.js";

const FormParser = {
    'error': 0,
    'response': {},
    'fields': {},
    'parse': function (form){

        if(form.elements.length === 0){
            this.error = 1;
            this.response.error = this.error;
            this.response.message = '<span class="error">Unable to parse form fields.<br>Please constact support.</span>';
            
            return this.response;
        }

        for (const key in form.elements) {

            switch (true) {
                case (form.elements[key].type === "input"):
                    this.fields[form.elements[key].name] = form.elements[key].value;
                    break;
                case (form.elements[key].type === "textarea"):
                    this.fields[form.elements[key].name] = form.elements[key].value;
                break;

                case (form.elements[key].type === "xxxx"):
                    this.fields[form.elements[key].name] = form.elements[key].value;
                break;
            }
        }
        return this.fields;
    }
};

export {
    FormParser
}