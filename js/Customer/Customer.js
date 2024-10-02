import { Response } from "../Response/Response.js";

const Customer = {
    'response': Response,
    /**
     * Builds the HTML table filling it with the customers array.
     * @param {Array} customers 
     * @returns 
     */
    'customerTableTemplate': function(customers){

        this.response.result = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>`;    

        for (const customer of customers) {
            
            this.response.result += `<tr><td>` + customer.name + `</td><td>` + customer.age + `</td></tr>`;
        };
        
        this.response.result += `</tbody></table>`;

        return this.response;
    }
};

export {
    Customer
}
