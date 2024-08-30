<?php
/**
 * QUESTION 1
 *
 * Create a form with a single textarea that will sort words or phrases alphabetically separated by commas.
 * Validate that the field is not empty.
 * Clean up the string to remove any extra spaces and unnecessary commas
 * The result should be shown below the form.
 *
 * Please make sure your code runs as effectively as it can.
 *
 * The end result should look like the following:
 * apples, cars, tables and chairs, tea and coffee, zebras
 */
?>
<?php

?>
<!DOCTYPE html>
<html>
<head>
	<title>Test1</title>
</head>
<body>
	<h1>Sort List</h1>
	<form method="post">
		<input type="hidden" name="action" value="sort" />
		<label for="to_sort">Please enter the words/phrases to be sorted separated by commas:</label><br/>
		<textarea name="to_sort" style="width: 400px; height: 150px;"></textarea><br/>
		<div class="hidden warning">The textarea cannot be empty!</div>
		<input type="submit" value="Sort" />
	</form>
	<div id="result"></div>
</body>

<script type="text/javascript">
    document.addEventListener("submit", function(event) {
    // Retrieve the current submitted form object
    const submittedForm = event.target;

    // Check if the event target is a form
    if (submittedForm && submittedForm.nodeName === "FORM") {
        // Your custom logic here
        console.log('Form submitted:', submittedForm);

        // Prevent the form from submitting (if needed)
        event.preventDefault();
        // Prevent the default form submission
            event.preventDefault();

            // Get the textarea value
            const textArea = document.getElementsByName('to_sort')[0].value;

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


</script>
</html>