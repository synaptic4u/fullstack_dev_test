import { FormParser } from "../FormParser/FormParser.js";
import { Response } from "../Response/Response.js"
import { Sanitize } from "../Sanitize/Sanitize.js";
import { Validate } from "../Validate/Validate.js";

/**
 * Object ListParser. Second Level Controller. Responsible for logic to parse comma delimeted strings from forms.
 */
const ListParser = {
    'response': Response,
    'validate': Validate,
    'sanitize': Sanitize,
    /** Method ListParser->parseList
    * Parses the form & then the list. 
    */
    'parseList': function(submittedForm){
        
        // Get the form fields value
        this.response = FormParser.parse(submittedForm);
        console.log(this.response);
        
        // Should return false if validation fails for a empty/null/bad value that we cannot process.
        if(!this.validate.checkStringEmpty(this.response.result.to_sort)){

            // FormParser returns empty to_sort field set in this.response.result
            this.response.error = 1;
            this.response.result = null;

            this.response.message = '<span class="error">The textarea cannot be empty!<br>Please provide a comma seperated list of values.</span>';
            
            return this.response;
        }
        
        // Parses Validation
        // Split the string into an array by commas
        let items = this.sanitize.csvList(this.response.result.to_sort);

        // Sort the array alphabetically
        items.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        // Join the sorted array back into a string
        let sortedResult = items.join(', ');

        // Build the result
        this.response.result = '<span class="info">Sorted List: ' + (sortedResult) ? sortedResult : 'No results to display' + '</span>';

        return this.response;
    },
    'attach' : function(request){

        return this.parseList(request);
    }
}

export {
    ListParser 
}