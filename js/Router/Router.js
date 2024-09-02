import { FormEventListener } from "../FormEventListener/FormEventListener.js";

/**
 * Object Router
 * Loads the corresponding Controller for the given appType route param.
 * Returns the instantiated
 */
const Router = {
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

            return 1;
        }

    }
};

export {Router};