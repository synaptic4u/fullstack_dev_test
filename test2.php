<?php
/**
 * QUESTION 2
 *
 * Using the data stored in the database
 * show a list of products with their prices
 * grouped by category.
 * The categories should be listed in alphabetical order.
 * The products within those categories should also be listed in alphabetical order.
 * Products with no category will be categorized as "Uncategorized".
 * If there are no results, then it should just say "There are no results available."
 *
 * Please make sure your code runs as effectively as it can.
 */

    if (file_exists(dirname(__FILE__, 1).'/vendor/autoload.php')) {
        
        require_once dirname(__FILE__, 1).'/vendor/autoload.php';
    }
 
    use Synaptic4u\Emile\DBMYSQLI\DBMYSQLI;

?>
<!DOCTYPE html>
<html>
<head>

    <!-- META -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- TITLE -->
    <title>Test2</title> 

    <!-- STYLESHEET -->
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <h1>Products</h1>
 
    <!-- MESSAGE DIV - INFO, SUCCESS, ERROR -->
    <div id="message" class="message hidden"></div>

    <div class="container"></div>
<?php

    // Prepare the SQL query to get products with categories
    $query = "
        SELECT 
            IFNULL(c.category, 'Uncategorized') AS category, 
            p.product, 
            p.price 
        FROM 
            products p
        LEFT JOIN 
            categories c ON p.category_id = c.id
        ORDER BY 
            category ASC, 
            p.product ASC
    ";

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
