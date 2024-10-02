import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";
import { Customer } from "../Customer/Customer.js";

const Search = {
    'response': Response,
    'dataArray': [],
    /**
     * Filters the local data array for a object by name.
     * @param {String} query 
     */
    'filterByName': function( query) {
                
        this.dataArray = this.dataArray.filter(data => 
      
            data.name.toLowerCase().includes(query.toLowerCase())
        );       
    },
    /**
     * Filters the local dataArray for the age range, works off previously calculated age
     * @param {String``} ageRange 
     */
    'filterByAgeRange': function(ageRange) {

        let [minAge, maxAge] = ageRange.split('-').map(Number);
        
        this.dataArray = this.dataArray.filter(data =>
        
            data.age >= minAge && data.age <= maxAge
        );
    },
    /**
     * Calculates the birthday to age based upon the current date
     * @param {Date String} ageDate 
     * @returns 
     */
    'calcAge': function(ageDate){

        let birthDate = new Date(ageDate);
        let today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        
        let monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        
            age--;
        }
        
        return age;
    },
    /**
     * Parses the global variable customers to calculate each customers age and add it to the local dataArray.
     */
    'addAgeToCustomers': function(){

        this.dataArray = customers.map(customer => ({
            ...customer,
            age: this.calcAge(customer.birthdate)
        }));
    },
    /**
     * Searches the customer data for the parsed form search values.
     * @param {FormObject} request 
     * @returns Response
     */
    'search': function(request){

        this.response = FormParser.parse(request);

        this.addAgeToCustomers();

        let search_age = this.response.result.search_age;
        let search_name = this.response.result.search_name;
        
        if(Validate.checkStringEmpty(search_age)){

            this.filterByAgeRange(search_age);   
        }

        if(Validate.checkStringEmpty(search_name)){

            this.filterByName(search_name);            
        }

        return Customer.customerTableTemplate(this.dataArray);
    },
    'attach' : function(request){

        return this.search(request);
    }
};

export {
    Search
}
