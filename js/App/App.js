import { Router } from "../Router/Router.js";


/**
 * Object App
 * Initiates the app by dynamically attaching the route to the Router.
 */
const App = {
    /** Property: appType
     * This is the route passed through to the Router object to load the correct controller
     */
    'appType': null,
    /** Method: init
     * Tries to load the Router's controller, runs the response methods if set.
     * @param {String} appType  apps Router's route.
     */
    'init': function(appType){

        this.appType = appType;

        // Loads the routes Controller into the router & initiates.
        try{
            let router = Router;

            router.getRouter(this.appType);

            this.loadResponse(router.response);
        }catch(error){

            console.error('An error occurred:', error.message);
        }finally{
            router = null;
        }
    },
    /**  Method: load
     * Tries to load the Router's controller, runs the response methods if set.
     * Called from FormEventListener & Top level controllers, event listeners pass the Request through to the Apps router again.
     * @param {String} appType apps Router's route.
     * @param {Form} requestBody Form is passed through to the router as param.
     */
    'load': function(appType, requestBody){

        this.appType = appType;

        // Loads the routes Controller into the router & initiates.
        try{
            let router = Router;

            router.loadRouter(this.appType, requestBody);
            
            this.loadResponse(router.response);
        }catch(error){

            console.error('An error occurred:', error.message);
        }finally{
            router = null;
        }
    },
    /**
     * App -> loadResponse Updates html UI with app's response.
     * @param {Response} response 
     */
    'loadResponse': function (response){

            // Null is the default value of the Response objects properties.
            (response.message == null) ? '' : response.initMessage();

            (response.result == null) ? '' : response.initResult();

            (response.JSCall == null) ? '' : response.initJSCall();
    }

};

export {
    App
}