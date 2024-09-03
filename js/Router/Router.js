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
    /** Router -> getRouter Attaches the Top Level Controller to the App. Top Level Controllers are used to run & catch their own routing.
     * @param {String} route 
     * @returns Initiated TL Controller attached to UI - HTML Page
     */
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
    /**
     * Router -> loadRouter Secondary level routing functionality to include a request body which will be used in processing the request. Form submission.
     * @param {String} route 
     * @param {Object} request Body of the request. Ex. Form object
     * @returns 
     */
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