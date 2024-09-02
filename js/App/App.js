import { Router } from "../Router/Router.js";

/**
 * Object App
 * Initiates the app by dynamically attaching the route to the Router.
 */
const App = {
    /**
     * Property: appType
     * This is the route passed through to the Router object to load the correct controller
     */
    'appType': null,
    /**
     * Method: init
     * Tries to laod the Router's controller, runs the response methods if set.
     * @param {String} appType 
     */
    'init':  function(appType){
        this.appType = appType;

        // Loads the routes Controller into the app & initiates.
        try{
            let app = Router;

            app.response.result = app.getRouter(this.appType);
            console.log(app.response.result);

            // Null is the default value of the Response objects properties.
            (app.response.message == null) ? '' : app.response.initMessage();

            (app.response.result == null) ? '' : app.response.initResult();

            (app.response.JSCall == null) ? '' : app.response.initJSCall();

            if(app.response.error === 1){

                app = null;
            }
        }catch(error){

            console.error('An error occurred:', error.message);
        }
    },

};

export {
    App
}