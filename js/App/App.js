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
    'init':  function(appType){
        this.appType = appType;

        // Loads the routes Controller into the app & initiates.
        try{
            let router = Router;

            router.response.result = router.getRouter(this.appType);
            console.log(router.response.result);

            this.loadResponse(router.response);

            if(router.response.error === 1){

                router = null;
            }
        }catch(error){

            console.error('An error occurred:', error.message);
        }
    },
    /**  Method: load
     * Tries to load the Router's controller, runs the response methods if set.
     * @param {String} appType apps Router's route.
     */
    'load':  function(appType, requestBody){
        console.log(appType, requestBody);
        this.appType = appType;

        // Loads the routes Controller into the app & initiates.
        try{
            let router = Router;

            let rezz = router.loadRouter(this.appType, requestBody);

            this.loadResponse(router.response);

            if(router.response.error === 1){

                router = null;
            }
        }catch(error){

            console.error('An error occurred:', error.message);
        }
    },
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