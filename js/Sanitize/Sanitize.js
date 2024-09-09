import { Validate } from "../Validate/Validate.js";

const Sanitize = {
    'int': function (intVal){

        return intVal;
    },
    /** Method: Sanitize->csvList
     * Parses string list to array. Removes array value whitespace. Filters out empty values. Creates and returns a new array.
     * @param {String} csvList 
     * @returns {Array} list
     */
    'csvList': function(csvList){
        let list = csvList.split(',');

        list = list.map(
            item => item.trim()
        ).filter(
            item => Validate.checkStringEmpty(item)
        );
        return list;
    },
    'array': function(arrayVal){
        return arrayVal;
    }
};

export {
    Sanitize
}