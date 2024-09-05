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

// $con holds the connection
require_once('db.php');

// Query to get products with categories
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

$result = $con->query($query);

?>
<!DOCTYPE html>
<html>
<head>
    <title>Test2</title>
</head>
<body>
<h1>Products</h1>

<?php
if ($result->num_rows > 0) {
    $current_category = null;

    // Loop through the results and display them
    while ($row = $result->fetch_assoc()) {
        if ($current_category !== $row['category']) {
            // Close previous list if needed
            if ($current_category !== null) {
                echo "</ul>";
            }
            
            // New category
            $current_category = $row['category'];
            echo "<h2>{$current_category}</h2>";
            echo "<ul>";
        }
        
        echo "<li>{$row['product']} - \${$row['price']}</li>";
    }

    // Close the last list
    echo "</ul>";
} else {
    echo "<p>There are no results available.</p>";
}

$con->close();
?>

</body>
</html>
