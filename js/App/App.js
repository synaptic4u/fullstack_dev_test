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

            // Null is the default value of the Response objects properties.
            (router.response.message == null) ? '' : router.response.initMessage();

            (router.response.result == null) ? '' : router.response.initResult();

            (router.response.JSCall == null) ? '' : router.response.initJSCall();

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
    'load':  function(appType, request){
        this.appType = appType;

        // Loads the routes Controller into the app & initiates.
        try{
            let router = Router;

            router.loadRouter(this.appType);
            console.log(router.response.result);

            // Null is the default value of the Response objects properties.
            (router.response.message == null) ? '' : router.response.initMessage();

            (router.response.result == null) ? '' : router.response.initResult();

            (router.response.JSCall == null) ? '' : router.response.initJSCall();

            if(router.response.error === 1){

                router = null;
            }
        }catch(error){

            console.error('An error occurred:', error.message);
        }
    },

};

export {
    App
}