
/**
 * Object Response
 * Properties default with null to enable easy checking in other object.
 * Error defaults to 0 to represent success. 1 for failure.
 */
const Response = {
    'error': 0,
    'message': null,
    'JSCall': null,
    'result': null,
    'initMessage': function (){
        console.log(this.message);

        let messageDiv = document.getElementById('message');

        if (this.message != null) {
            messageDiv.classList.remove('hidden');
            messageDiv.classList.add('visible');

            messageDiv.innerHTML = this.message;
        } else {
            messageDiv.classList.remove('visible');
            messageDiv.classList.add('hidden');

            messageDiv.innerHTML = "";
        }
    },
    'initJSCall': function (){
        
        for (const key in this.JSCall) {
            
            let dynamic = document.createElement("script");
            dynamic.setAttribute("id", "dynamic");
            dynamic.setAttribute("type", "module");

            let calls = document.createTextNode((this.JSCall[key]).replace("'", ""));
            dynamic.appendChild(calls);
            document.body.appendChild(dynamic);
            
            document.getElementById('dynamic').remove();
        }
    },
    'initResult': function (){
        document.getElementById('result').innerHTML = this.result;
    },
};

export {
    Response
}