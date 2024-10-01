import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";

const Search = {
    'response': Response,
    'filterByName': function(customers, query) {
      
        return customers.filter(customer => 
      
            customer.name.toLowerCase().includes(query.toLowerCase())
        );
    },
    'filterByAgeRange': function(customers, ageRange) {
      
        let [minAge, maxAge] = ageRange.split('-').map(Number);
        
        return customers.filter(customer =>
        
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

            customers = customers.map(customer => ({
                ...customer,
                age: this.calcAge(customer.birthdate)
            }));
 

        if(Validate.checkStringEmpty(this.response.result.search_age)){

            console.log('this.response.result.search_age')
            console.log(this.response.result.search_age)

            customers = this.filterByAgeRange(customers, this.response.result.search_age);
        }

        if(Validate.checkStringEmpty(this.response.result.search_name)){

            console.log('this.response.result.search_name')
            console.log(this.response.result.search_name)

            customers = this.filterByName(customers, this.response.result.search_name);
        }

        this.buildResponse(customers);
        
        return this.response;
    },
    'buildResponse': function(customers){
        this.response.result = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>`;    
        console.log(customers);
        customers.forEach(customer => {
            console.log(customer);
            this.response.result += `<tr><td>` + customer.name + `</td><td>` + customer.age + `</td></tr>`;
        });
        
        this.response.result += `</tbody></table>`;
        
        console.log(this.response.result);
    },
    'attach' : function(request){

        return this.search(request);
    }
};

export {
    Search
}
