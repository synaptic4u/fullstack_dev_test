import { Response } from "../Response/Response.js";
import { Validate } from "../Validate/Validate.js";

const Sanitize = {
    'response': Response,

    /** Method: Sanitize->csvList
     * Parses string list to array. Removes array value whitespace. Filters out empty values. Creates and returns a new array.
     * @param {String} csvList 
     * @returns {Array} list
     */
    'csvList': function(csvRaw){
        let csvList = csvRaw.split(',');

        csvList = csvList.map(

            item => item.trim()
        ).filter(
            
            item => Validate.checkStringEmpty(item)
        );
        
        csvList = this.sortArrayAZ(csvList);

        return csvList.join(', ');
    },
    /** Method: Sanitize->sortArrayAZ
     * Sorts the  array alphabetically. Rejo
     * @param {Array} items 
     * @returns {Array}
     */
    'sortArrayAZ' : function(items){

        // Sort the array alphabetically
        items.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        // Join the sorted array back into a string
        return items;
    },
    'array': function(arrayVal){
        return arrayVal;
    }
};

export {
    Sanitize
}