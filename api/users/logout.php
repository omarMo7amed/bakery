<?php
require_once "./../../config/database.php";
require_once "./../../services/user.service.php";

$database = new Database();
$connection = $database->getConnection();

$userService = new UserService($connection);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    echo $userService->logout();
}