import { Customers } from "../Customers/Customers.js";
import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";


const Search = {
    'response': Response,
    'customer': Customers,
    'search': function(request){

        this.response = FormParser.parse(request);

        if(Validate.checkStringEmpty(this.response.result.search_age)){
            console.log(this.response.result.search_age)
            
        }

        if(Validate.checkStringEmpty(this.response.result.search_name)){
            console.log(this.response.result.search_name)
            
        }
    },
    'attach' : function(request){

        return this.search(request);
    }
};

export {
    Search
}