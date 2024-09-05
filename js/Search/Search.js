import { Customers } from "../Customers/Customers.js";
import { FormParser } from "../FormParser/FormParser.js";


const Search = {
    'parser': FormParser,
    'customer': Customers,
    'parser': FormParser,
    'search': function(request){

        parser.parse(request);
    },
    'attach' : function(request){

        return this.search(request);
    }
};

export {
    Search
}