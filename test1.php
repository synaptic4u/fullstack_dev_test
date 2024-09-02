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

    <!-- META -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
     <!-- TITLE -->
	<title>Test1</title>

    <!-- STYLESHEET -->
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
	<h1>Sort List</h1>
    <div id="message" class="message hidden"></div>
	<form method="post">
		<input type="hidden" name="action" value="sort" />
		<label for="to_sort">Please enter the words/phrases to be sorted separated by commas:</label><br/>
		<textarea name="to_sort" style="width: 400px; height: 150px;"></textarea><br/>
		<div class="hidden warning">The textarea cannot be empty!</div>
		<input type="submit" value="Sort" />
	</form>
	<div id="result"></div>
</body>


<!-- MAIN JAVASCRIPT -->
<script type="module" >
    import { App } from "./js/App/App.js";
    
    App.init('test1');
</script>

</html>