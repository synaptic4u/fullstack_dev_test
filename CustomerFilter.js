
import { Response } from "./js/Response/Response.js";

const CustomerFilter = {
    'response': Response,
    'calculateAge': function(birthdate) {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    'filterByName': function(customers, query) {
        return customers.filter(customer => 
            customer.name.toLowerCase().includes(query.toLowerCase())
        );
    },
    'filterByAgeRange': function(customers, range) {
        const [minAge, maxAge] = range.split('-').map(Number);
        return customers.filter(customer =>
            customer.age >= minAge && customer.age <= maxAge
        );
    },
    'displayCustomers': function(customers) {
        let tableContent = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        customers.forEach(customer => {
            tableContent += `<tr><td>${customer.name}</td><td>${customer.age}</td></tr>`;
        });
        
        tableContent += '</tbody></table>';
        
        this.response.result = tableContent;
        this.response.initResult();
    },
    'processFilters': function(nameQuery, ageRange, customers) {
        let filteredCustomers = customers;

        if (nameQuery) {
            filteredCustomers = this.filterByName(filteredCustomers, nameQuery);
        }

        if (ageRange) {
            filteredCustomers = this.filterByAgeRange(filteredCustomers, ageRange);
        }

        this.displayCustomers(filteredCustomers);
    },
};

export { CustomerFilter };
