import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";


const Search = {
    'response': Response,
    'search': function(request){

        this.response = FormParser.parse(request);
        
            console.log('customers' + customers)

        if(Validate.checkStringEmpty(this.response.result.search_age)){
            console.log(this.response.result.search_age)
        }

        if(Validate.checkStringEmpty(this.response.result.search_name)){
            console.log(this.response.result.search_name)
            
        }

        return this.response;
    },
    'attach' : function(request){

        return this.search(request);
    }
};

export {
    Search
}