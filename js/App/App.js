import { Router } from "../Router/Router.js";

/**
 * Object App
 * Initiates the app by dynamically attaching the route to the Router.
 */
const App = {
    'appType': null,
    'init':  function(appType){
        this.appType = appType;

        // Loads the routes Controller into the app & initiates.
        try{
            let app = Router;
            app.getRouter(this.appType);

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