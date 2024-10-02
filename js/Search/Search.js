import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";

const Search = {
    'response': Response,
    'dataArray': [],
    'filterByName': function( query) {
                
        this.dataArray = this.dataArray.filter(data => 
      
            data.name.toLowerCase().includes(query.toLowerCase())
        );       
    },
    'filterByAgeRange': function(ageRange) {

        let [minAge, maxAge] = ageRange.split('-').map(Number);
        
        this.dataArray = this.dataArray.filter(customer =>
        
            customer.age >= minAge && customer.age <= maxAge
        );
    },
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

        this.buildResponse();
        
        return this.response;
    },
    'buildResponse': function(){

        this.response.result = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>`;    

        for (const customer of this.dataArray) {
            
            this.response.result += `<tr><td>` + customer.name + `</td><td>` + customer.age + `</td></tr>`;
        };
        
        this.response.result += `</tbody></table>`;
    },
    'attach' : function(request){

        return this.search(request);
    }
};

export {
    Search
}
