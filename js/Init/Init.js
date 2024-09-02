import { Router } from "../Router/Router.js";

/**
 * Object Init
 * Initiates the app by dynamically attaching the route to the Router.
 */
const Init = {
    'appType': null,
    'init':  function(appType){
        this.appType = appType;

        // Loads the routes Controller into the app already initiated.
        Router.getRouter(this.appType);
    },

};

export {
    Init
}