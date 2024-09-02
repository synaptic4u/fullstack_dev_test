
/**
 * Object Response
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
        
    },
    'initResult': function (){
        document.getElementById('result').innerHTML = this.result;
    },
};

export {
    Response
}