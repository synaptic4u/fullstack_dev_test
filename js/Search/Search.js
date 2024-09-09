import { Customers } from "../Customers/Customers.js";
import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";


const Search = {
    'response': Response,
    'customer': Customers,
    'search': function(request){

        return this.response = FormParser.parse(request);
    },
    'attach' : function(request){

        return this.search(request);
    }
};

export {
    Search
}