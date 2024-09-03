import { CustomerFilter } from "./CustomerFilter.js";
import { Response } from "./js/Response/Response.js";

const CustomerList = {
    'init': function(customers) {
        customers = customers.map(customer => ({
            ...customer,
            age: CustomerFilter.calculateAge(customer.birthdate)
        }));

        document.getElementById('searchBox').addEventListener('input', (event) => {
            const nameQuery = event.target.value.trim();
            const ageRange = document.getElementById('ageDropdown').value;
            CustomerFilter.processFilters(nameQuery, ageRange, customers);
        });

        document.getElementById('ageDropdown').addEventListener('change', (event) => {
            const ageRange = event.target.value;
            const nameQuery = document.getElementById('searchBox').value.trim();
            CustomerFilter.processFilters(nameQuery, ageRange, customers);
        });

        // Initially display all customers
        CustomerFilter.displayCustomers(customers);
    },
};

export { CustomerList };
