import { FormEventListener } from "../FormEventListener/FormEventListener.js";
import { Response } from "../Respone/Response.js";
import { Utils } from "../Utils/Utils.js";

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
            
            this.response.JSCall = Utils.submitBtnDisable();
            this.response.error = 1;
            this.response.message = '<span class="error">Route not found.<br>Please contact support for correct configuration.</span>';
            
        }

    }
};

export {Router};