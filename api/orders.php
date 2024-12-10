<?php
require_once "./../config/database.php";
require_once "./../services/order.service.php";
require_once "./../services/jwt.service.php";

$database = new Database();
$connection = $database->getConnection();
$orderService = new OrderService($connection);
$jwtService = new JWTService();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents("php://input"), true);
    $orderId = null;
    if (isset($_GET['orderId']) && is_numeric($_GET['orderId'])) {
        $orderId = $_GET['orderId'];
    }
    $authResponse = $jwtService->isAuthenticated();
    if ($authResponse !== true) {
        echo $authResponse;
        return;
    }
    echo $orderService->getUserOrderById($orderId);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['cart'], $data['totalPrice'])) {
        echo json_encode(["error" => "Missing 'cart' or 'totalPrice'", "data" => $data]);
        return;
    }

    $cart = $data['cart'];
    $total_price = $data['totalPrice'];

    if (!is_array($cart)) {
        echo json_encode(["error" => "'cart' must be an array", "cart" => $cart]);
        return;
    }

    $authResponse = $jwtService->isAuthenticated();
    if ($authResponse !== true) {
        echo $authResponse;
        return;
    }
    echo $orderService->createOrder($total_price, $cart);
}