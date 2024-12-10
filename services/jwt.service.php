<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../vendor/autoload.php';  // مش قادر والله

class JWTService
{
    private string $secretKey;
    private int $tokenLifeTime;

    public function __construct()
    {
        $this->secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
        $this->tokenLifeTime = time() + 10 * 86400;
    }

    public function generateJWT($id)
    {
        $payload = [];
        $payload["userId"] = $id;
        $payload["iat"] = time();
        $payload["exp"] = $this->tokenLifeTime;
        return JWT::encode($payload, $this->secretKey, 'HS256');
    }

    public function verifyJWT($token)
    {
        try {
            return JWT::decode($token, new Key($this->secretKey, 'HS256'));
        } catch (Exception $exception) {
            throw new Exception("Invalid or expired token: " . $exception->getMessage());
        }
    }
    public function isAuthenticated()
    {
        try {

            if (isset($_COOKIE['auth_token'])) {
                $decodedPayload = $this->verifyJWT($_COOKIE['auth_token']);
                $_SESSION['user'] = $decodedPayload->userId;
                return true;
            } else {
                throw new Exception("Authentication token not found!");
            }

        } catch (Exception $exception) {
            http_response_code(401);
            return json_encode(["error" => $exception->getMessage()]);
        }
    }
}