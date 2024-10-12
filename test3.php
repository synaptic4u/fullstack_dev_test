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
		select year(o.order_date) as sales_year, 
			   monthname(o.order_date) as sales_month, 
			   GROUP_CONCAT(distinct u.last_name, ", ",  u.first_name) as customer,
			    group_concat(distinct p.product) as products, sum(p.price) as sales_total 
		  from orders o
		  left join order_items oi
			on o.id = oi.order_id
		  left join products p
			on oi.product_id = p.id 
		  join users u 
			on o.user_id = u.id 
		 where o.order_status_id  in(1,2)
		 group by year(o.order_date), month(o.order_date), u.last_name, u.first_name, monthname(o.order_date)
		 order by sum(p.price) DESC , u.last_name, u.first_name;
	';

	$db = new DBMYSQLI();

	$result = $db->query($query);
	// var_dump(json_encode($result));

	// Check if there are any rows
	if ($result->num_rows > 0) {

		$html = '<br>
			<table>
				<thead>
				
					<tr>
						<th>Year</th>
						<th>Month</th>
						<th>Customer</th>
						<th>Product List</th>
						<th>Total Spent</th>
					</tr>
				</thead>

				<tbody>';
				
		while ($row = $result->fetch_assoc()) {

			$html .= '
					<tr>
				
						<td>
							'. $row['sales_year'] .'
						</td>
						<td>
							'. $row["sales_month"] .'
						</td>
						<td style="white-space:nowrap;">
							'. $row["customer"] .'
						</td>
						<td>
							'. $row["products"] .'
						</td>
						<td>
							'. $row["sales_total"] .'
						</td>
					</tr>';
		}

		$html .= '
				</tbody>
			</table>';

		echo($html);
	} else {

		echo "<h3>There are no results available.</h3>";
	}
?>

</body>
</html>