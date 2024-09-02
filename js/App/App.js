import { Router } from "../Router/Router.js";

/**
 * Object App
 * Initiates the app by dynamically attaching the route to the Router.
 */
const App = {
    'appType': null,
    'init':  function(appType){
        this.appType = appType;

        // Loads the routes Controller into the app already initiated.
        try{
            let app = Router;
            app.getRouter(this.appType);

            if(app.response.error === 1){

                app.response.initMessage();

                app = null;
            }
        }catch{}
        
    },

};

export {
    App
}