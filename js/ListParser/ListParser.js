import { Response } from "../Respone/Response.js"

const ListParser = {
    'response': Response,
    'parseList': function(submittedForm){
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
    },
    'attach' : function(request){
        this.parseList(request);
        return Response;
    }
}

export {
    ListParser 
}