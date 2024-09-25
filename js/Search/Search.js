import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";

const Search = {
    'response': null,
    'search': function(request){

        this.response = FormParser.parse(request);
        
            console.log('Search this.response')
            console.log(this.response)
            console.log('Search this.response.result')
            console.log(this.response.result)
            console.log('customers' + customers)

        if(Validate.checkStringEmpty(this.response.result.search_age)){

            console.log('this.response.result.search_age')
            console.log(this.response.result.search_age)
        }

        if(Validate.checkStringEmpty(this.response.result.search_name)){

            console.log('this.response.result.search_name')
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