<?php
require_once "./../../config/database.php";
require_once "./../../services/user.service.php";

$database = new Database();
$connection = $database->getConnection();

$userService = new UserService($connection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'] ?? null;
    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;
    $address = $data['address'];
    $phone_number = $data['phone_number'] ?? null;
    echo $userService->SignUp($username, $email, $password, $phone_number, $address);
}