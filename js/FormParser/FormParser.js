import { Response } from "../Response/Response.js";

const FormParser = {
    'error': 0,
    'response': Response,
    'fields': {},
    'parse': function (form){

        this.checkError(form.elements.length < 1);

        if(this.error === 0){

            for (const key in form.elements) {

                // console.log(key);
                // console.log(form.elements[key].type);
                switch (true) {
                
                    case (form.elements[key].type === "text"):
                        // console.log(form.elements[key].name);
                        // console.log(form.elements[key].value);
                        this.fields[form.elements[key].name] = form.elements[key].value;
                        break;
                
                    case (form.elements[key].type === "textarea"):
                        // console.log(form.elements[key].name);
                        // console.log(form.elements[key].value);
                        this.fields[form.elements[key].name] = form.elements[key].value;
                        break;

                    case (form.elements[key].type === "select-one"):
                        // console.log(form.elements[key].name);
                        // console.log(form.elements[key].value);
                        this.fields[form.elements[key].name] = form.elements[key].value;
                        break;
                }
            }
            console.log(this.fields)

            this.response.result = this.fields;
        }

        this.checkError(Object.keys(this.fields).length < 1);

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