import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";

const Search = {
    'response': Response,

    'filterByAgeRange': function(customers, ageRange) {
      
        let [minAge, maxAge] = ageRange.split('-').map(Number);
        
        return customers.filter(customer =>
        
            customer.age >= minAge && customer.age <= maxAge
        );
    },
    'calcAge': function(birthDate){

        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        
            age--;
        }
        
        return age;

    },
    /**
     * Searches the customer data for the parsed form search values.
     * @param {FormObject} request 
     * @returns Response
     */
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

            customers = customers.map(customer => ({
                ...customer,
                age: this.calcAge(customer.birthdate)
            }));
    
            
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
