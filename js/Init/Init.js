import { Router } from "../Router/Router.js";

const Init = {
    'appType': null,
    'init':  function(appType){
        this.appType = appType;

        console.log('init');
        let router = Router;
        let app = router.routes.question1.attach();
    },

};

export {
    Init
}