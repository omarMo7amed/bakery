<?php

$host = "localhost";
$databaseName = "bakery";
$databaseUsername = "root";
$databasePassword = "";


try {

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $mysqli = new mysqli($host, $databaseUsername, $databasePassword, $databaseName);

    $createTablesSql = [
        "CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone_number VARCHAR(15),
            address TEXT,
            role VARCHAR(15) DEFAULT 'customer'
        )",
        "CREATE TABLE orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            total_price DECIMAL(10, 2) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )",
        "CREATE TABLE categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description TEXT
        )",
        "CREATE TABLE Products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            image JSON,
            quantity INT DEFAULT 50,
            ingredients TEXT,
            offers BOOLEAN DEFAULT FALSE,
            rate INT CHECK (rate BETWEEN 0 AND 5),
            category_id INT NOT NULL,
            category_name VARCHAR(100),
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )",

        "CREATE TABLE order_products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            product_id INT NOT NULL,
            quantity INT NOT NULL DEFAULT 1,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        )",
        "CREATE TABLE payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            card_number VARCHAR(16) NOT NULL,
            cvv VARCHAR(3) NOT NULL,
            name_on_card VARCHAR(100) NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )"
    ];

    foreach ($createTablesSql as $sql) {
        if (!$mysqli->query(query: $sql)) {
            throw new mysqli_sql_exception("Error creating table" . $mysqli->error);
        }
    }
    echo "Tables created successfully!";
} catch (mysqli_sql_exception $exception) {
    die("An error occurred: " . $exception->getMessage());
} finally {
    $mysqli->close();
}