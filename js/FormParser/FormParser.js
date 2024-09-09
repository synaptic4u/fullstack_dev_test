import { Response } from "../Response/Response.js";

const FormParser = {
    'error': 0,
    'response': Response,
    'fields': {},
    'parse': function (form){

        this.checkError(form.elements.length < 1);

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

        this.checkError(Object.keys(this.fields).length < 1);

        this.response.result = this.fields;

        // console.log(this.response);
        return this.response;
    },
    'checkError': function(check){

        if(check == true){
            
            this.error = 1;
            
            this.response.error = this.error;

            this.response.message = '<span class="error">Unable to parse form fields.<br>Please constact support.</span>';
        }
    }
};

export {
    FormParser
}