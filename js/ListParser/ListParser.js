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
    /** 
    *   ListParser -> parseList. Parses the form & then the list. 
    */
    'parseList': function(submittedForm){
        
        // Get the form fields value
        let formFields = FormParser.parse(submittedForm);
        
        if(formFields){

        }
        // Validate that the field is not empty
        if (textArea.trim() === '') {
            this.response.error = 1;

            this.response.message = '<span class="error">The textarea cannot be empty!</span>';
            
            return this.response;
        }

        // Split the string into an array by commas
        let items = textArea.split(',');

        // Clean up the array: remove extra spaces and filter out empty items
        items = items.map(
            item => item.trim()
        ).filter(
            item => item !== ''
        );

        // Sort the array alphabetically
        items.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        // Join the sorted array back into a string
        let sortedResult = items.join(', ');

        // Display the result
        this.response.result = '<span class="info">Sorted List: ' + sortedResult + '</span>';

        return this.response;
    },
    'attach' : function(request){

        return this.parseList(request);
    }
}

export {
    ListParser 
}