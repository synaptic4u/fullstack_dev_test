import { FormEventListener } from "../FormEventListener/FormEventListener.js";
import { Response } from "../Respone/Response.js";

/**
 * Object Router
 * Loads the corresponding Controller for the given appType route param.
 * Returns the instantiated
 */
const Router = {
    'request': null,
    'response': Response,
    'routes': {
        'test1': FormEventListener,
        'test4': FormEventListener,
    },
    'getRouter': function(route){

        if(route in this.routes){
        
            return this.routes[route].attach();
        }else{
                    
            // Find all input elements with type="submit"
            const submitButtons = document.querySelectorAll('input[type="submit"]');

            // Loop through each button and disables them.
            submitButtons.forEach(button => {
                button.disabled = true;
            });

            this.response.error = 1;
            this.response.message = '<span class="error">Route not found.<br>Please contact support for correct configuration.</span>';
            
        }

    }
};

export {Router};