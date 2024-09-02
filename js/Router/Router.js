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
            
            this.response.JSCall = [
                'import { Utils } from "./js/Utils/Utils.js";' + 'Utils.submitBtnDisable();'
            ];
            this.response.error = 1;
            this.response.message = '<span class="error">JS Application\'s Route not found.<br>Please contact support for correct configuration.</span>';
            
        }

    }
};

export {Router};