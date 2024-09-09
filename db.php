<?php

/**
 * DB Connection script.
 */
$con = mysqli_connect("localhost", "root", "root", "devtest");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

/**
 * Function to execute a parameterized SELECT query and return results.
 * 
 * @param string $query The SQL query with placeholders.
 * @param string $types Types of the parameters ('s' for string, 'i' for integer, etc.).
 * @param array $params Array of parameters to bind to the query.
 * @return array|null The result set as an associative array, or null if there is an error.
 */
function executeSelectQuery($con, $query, $types = '', $params = []) {
    // Prepare the query
    if ($stmt = mysqli_prepare($con, $query)) {

        // Bind parameters if needed
        if (!empty($types) && !empty($params)) {
            mysqli_stmt_bind_param($stmt, $types, ...$params);
        }

        // Execute the statement
        mysqli_stmt_execute($stmt);

        // Get the result
        $result = mysqli_stmt_get_result($stmt);

        // Fetch all results as an associative array
        $data = $result->fetch_all(MYSQLI_ASSOC);

        // Free result and close the statement
        mysqli_stmt_free_result($stmt);
        mysqli_stmt_close($stmt);

        return $data;

    } else {
        // Error in preparation of the statement
        echo "Failed to prepare statement: " . mysqli_error($con);
        return null;
    }
}

/**
 * Function to execute a parameterized INSERT/UPDATE/DELETE query.
 * 
 * @param string $query The SQL query with placeholders.
 * @param string $types Types of the parameters ('s' for string, 'i' for integer, etc.).
 * @param array $params Array of parameters to bind to the query.
 * @return bool Returns true if the query executed successfully, false otherwise.
 */
function executeQuery($con, $query, $types = '', $params = []) {
    // Prepare the query
    if ($stmt = mysqli_prepare($con, $query)) {

        // Bind parameters if needed
        if (!empty($types) && !empty($params)) {
            mysqli_stmt_bind_param($stmt, $types, ...$params);
        }

        // Execute the statement
        $result = mysqli_stmt_execute($stmt);

        // Check if the query was successful
        if ($result) {
            $affected_rows = mysqli_stmt_affected_rows($stmt);
            mysqli_stmt_close($stmt);
            return $affected_rows > 0;
        } else {
            // Error in execution
            echo "Query failed: " . mysqli_error($con);
            return false;
        }

    } else {
        // Error in preparation of the statement
        echo "Failed to prepare statement: " . mysqli_error($con);
        return false;
    }
}

?>
