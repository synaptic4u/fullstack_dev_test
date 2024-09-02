import { App } from "../App/App.js";

const FormEventListener = {
    'attach': function(){
        document.addEventListener("submit", function(event) {
            // Retrieve the current submitted form object
            const submittedForm = event.target;
        
            // Check if the event target is a form
            if (submittedForm && submittedForm.nodeName === "FORM") {
                // Your custom logic here
                console.log('Form id:', submittedForm.id);
                console.log('Form submitted:', submittedForm);
                
        
                // Prevent the form from submitting (if needed)
                event.preventDefault();

                // let app = App.load(submittedForm.id, submittedForm);
                // console.log(app)
                            
                // App.load(submittedForm.id, submittedForm);
        
                    // Get the textarea value
                    const textArea = submittedForm.elements.to_sort.value;
        
                    // Validate that the field is not empty
                    if (textArea.trim() === '') {
                        alert('The textarea cannot be empty!');
                        return;
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
                    const sortedResult = items.join(', ');
        
                    // Display the result
                    document.getElementById('result').innerText = `Sorted List: ${sortedResult}`;
            }
        }, true); 
    },
};

export {
    FormEventListener
};