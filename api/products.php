<?php
require_once "./../config/database.php";
require_once "./../services/product.service.php";
require_once "./../services/jwt.service.php";
$database = new Database();
$connection = $database->getConnection();

$productService = new ProductService($connection);
$jwtService = new JWTService();

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    header('Content-Type: application/json');
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $id = (int) $_GET['id'];
        echo $productService->getProductById($id);
    } else {
        /**
         *  Check if the user is authenticated by calling the `isAuthenticated` method from the JWT service.
         *  If the method does not return `true`, output the response (e.g., error message) and terminate the execution.
         *  This ensures that only authenticated users can proceed with the requested operation.

         */
        // $authResponse = $jwtService->isAuthenticated();
        // if ($authResponse !== true) {
        //     echo $authResponse;
        //     return;
        // }
        echo $productService->getAllProducts();
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'] ?? null;
    $description = $data['description'] ?? null;
    $price = $data['price'] ?? null;
    $image = json_encode($data['image'] ?? []);
    $quantity = $data['quantity'] ?? null;
    $ingredients = $data['ingredients'] ?? null;
    $offers = isset($data['offers']) ? (bool) $data['offers'] : null;
    $rate = $data['rate'] ?? null;
    $category_id = $data['category_id'] ?? null;
    $category_name = $data['category_name'] ?? null;
    echo $productService->createProduct($name, $description, $price, $image, $quantity, $ingredients, $offers, $rate, $category_id, $category_id);
}

// هيبعت الداتا ك جيسون_
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;
    $price = $data['price'] ?? null;
    $quantity = $data['quantity'] ?? null;
    echo $productService->updateProduct($id, $price, $quantity);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    header('Content-Type: application/json');
    $id = (int) $_GET['id'] ?? null;
    echo $productService->deleteProductById($id);
}