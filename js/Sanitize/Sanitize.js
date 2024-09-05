
const Sanitize = {
    'int': function (intVal){

        return intVal;
    },
    'string': function(stringVal){
        return stringVal;
    },
    'array': function(arrayVal){
        return arrayVal;
    }
};

export {
    Sanitize
}