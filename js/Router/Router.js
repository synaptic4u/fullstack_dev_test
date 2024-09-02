import { FormEventListener } from "../FormEventListener/FormEventListener.js";
import { ListParser } from "../ListParser/ListParser.js";
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
        'list_parser': ListParser,
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

    },
    'loadRouter': function(route, request){
        console.log(route, request);

        if(route in this.routes){
        
            return this.routes[route].attach(request);
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