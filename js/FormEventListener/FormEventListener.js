import { App } from "../App/App.js";

const FormEventListener = {
    'attach': function(){
        document.addEventListener("submit", function(event) {

            // Retrieve the current submitted form object
            let submittedForm = event.target;
        
            // Check if the event target is a form
            if (submittedForm && submittedForm.nodeName === "FORM") {
                // Your custom logic here
                console.log('Form id:', submittedForm.id);
                console.log('Form submitted:', submittedForm);
                        
                // Prevent the form from submitting (if needed)
                event.preventDefault();

                App.load(submittedForm.id, submittedForm);
            }
        }, true); 
    },
};

export {
    FormEventListener
};