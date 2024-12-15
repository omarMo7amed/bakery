<?php

require_once "./../config/database.php";
require_once "./../services/jwt.service.php";
require_once "./../services/jwt.service.php";
require_once "./../services/payment.service.php";

$database = new Database();
$connection = $database->getConnection();

$jwtService = new JWTService();
$pyamentService = new PaymentService($connection);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents("php://input"), true);
    $card_number = $data['card_number'] ?? null;
    $cvv = $data['cvv'] ?? null;
    $name_on_card = $data['name_on_card'] ?? null;
    // ! authenticated?
    $authResponse = $jwtService->isAuthenticated();
    if ($authResponse !== true) {
        echo $authResponse;
        return;
    }
    echo $pyamentService->CreateNewPyament($card_number, $cvv, $name_on_card);

}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    $authResponse = $jwtService->isAuthenticated();
    if ($authResponse !== true) {
        echo $authResponse;
        return;
    }
    echo $pyamentService->getUserPayments();
}