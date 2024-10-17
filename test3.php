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

if (file_exists(dirname(__FILE__, 1).'/vendor/autoload.php')) {
        
	require_once dirname(__FILE__, 1).'/vendor/autoload.php';
}

use Synaptic4u\Emile\DBMYSQLI\DBMYSQLI;


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

    $html = '';
    $message = '';

	// Check if there are any rows
	if ($result->num_rows > 0) {

		$html .= '
			<table class="table-customer" style="width: 800px;">
				<thead>
				
					<tr style="border-bottom: 2px solid grey;">
						<th class="table-heading" style="text-align:start;">Year</th>
						<th class="table-heading" style="text-align:start;">Month</th>
						<th class="table-heading" style="text-align:start;">Customer</th>
						<th class="table-heading" style="text-align:start;white-space:nowrap;">Total Spent</th>
						<th class="table-heading" style="text-align:start;">Product List</th>
					</tr>
				</thead>

				<tbody>';
				
		while ($row = $result->fetch_assoc()) {

			$html .= '
					<tr style="border-bottom: 1px solid grey;">
				
						<td style="vertical-align:top;">
							'. $row['sales_year'] .'
						</td>
						<td style="vertical-align:top;">
							'. $row["sales_month"] .'
						</td>
						<td style="white-space:nowrap;vertical-align:top;">
							'. $row["customer"] .'
						</td>			
						<td style="vertical-align:top;text-align:start;">
							$'. number_format($row["sales_total"], 2) .'
						</td>';
			
			$html .= '<td style="vertical-align:top;">';

			foreach(explode(",", $row["products"]) as $product){
			
				$html .= $product.'<br>';
			}

			$html .= '	</td>
					</tr>';
		}

		$html .= '
				</tbody>
			</table>';
	} else {

		$message .= "<h3>There are no results available.</h3>";
	}
?>
<!DOCTYPE html>
<html>
<head>

	<!-- META -->
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- TITLE -->
	<title>Test3</title>

	<!-- STYLESHEET -->
	<link rel="stylesheet" href="./css/style.css">
</head>
<body>
	<h1>Top Customers per Month</h1>
	
	<!-- MESSAGE DIV - INFO, SUCCESS, ERROR -->
	<div id="message" class="message <?php echo((strlen($message) == 0) ? 'hidden' : '') ?>">
		<?php echo $message; ?>
	</div>

	<!-- RESULT DIV - To display the requests response -->
	<div id="result" class="container <?php echo((strlen($html) == 0)? 'hidden' : '') ?>"  style="overflow-x:auto; width:100%;">
		<?php echo $html; ?>
	</div>


</body>
</html>