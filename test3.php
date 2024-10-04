<?php
/**
 * QUESTION 3
 *
 * For each month that had sales show a list of customers ordered by who spent the most to who spent least.
 * If the totals are the same then sort by customer.
 * If a customer has multiple products then order those products alphabetical.
 * Months with no sales should not show up.
 * Show the name of the customer, what products they bought and the total they spent.
 * Only show orders with the "Payment received" and "Dispatched" status.
 * If there are no results, then it should just say "There are no results available."
 *
 * Please make sure your code runs as effectively as it can.
 *
 * See test3.html for desired result.
 */
?>
<?php

if (file_exists(dirname(__FILE__, 1).'/vendor/autoload.php')) {
        
	require_once dirname(__FILE__, 1).'/vendor/autoload.php';
}

use Synaptic4u\Emile\DBMYSQLI\DBMYSQLI;

?>
<!DOCTYPE html>
<html>
<head>
	<title>Test3</title>
</head>
<body>
<h1>Top Customers per Month</h1>

<?php

	// Prepare the SQL query to get products with categories
	$query = '	
		select sum(p.price) as SpentTotal, o.user_id, GROUP_CONCAT(u.first_name, " ", u.last_name) as Customer
  		  from orders o
		  left join order_items oi
			on o.id = oi.order_id
		  left join products p
			on oi.product_id = p.id 
		  left join users u 
			on o.user_id = u.id 
		 where o.order_status_id  in(1,2)
		 group by o.user_id
		 order by sum(p.price) DESC ;
	';

	$db = new DBMYSQLI();

	$result = $db->query($query);

	// Check if there are any rows
	if ($result->num_rows > 0) {

	$currentCategory = '';

	while ($row = $result->fetch_assoc()) {

		// Check if we're in a new category
		if ($row['category'] !== $currentCategory) {

			// Close the previous list if necessary and open a new one
			if (!empty($currentCategory)) {

				echo "</ul>";
			}

			// Print category header
			echo "<h2>" . htmlspecialchars($row['category']) . "</h2>";

			echo "<ul>";

			$currentCategory = $row['category'];
		}

		// Print product name and price
		echo "<li>" . htmlspecialchars($row['product']) . " - $" . number_format($row['price'], 2) . "</li>";
	}

	echo "</ul>"; // Close the last list
	} else {

	echo "<h3>There are no results available.</h3>";
	}
?>


</body>
</html>