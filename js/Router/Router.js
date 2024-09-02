import { FormEventListener } from "../FormEventListener/FormEventListener.js";

/**
 * Object Router
 * Loads the corresponding Controller for the given appType param.
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
            console.log("Route not found.");
            return 1;
        }

    }
};

export {Router};