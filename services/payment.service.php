<?php

class PaymentService
{
    private mysqli $mysqli;

    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    public function CreateNewPyament($card_number, $cvv, $name_on_card)
    {
        try {
            if (!isset($card_number, $cvv, $name_on_card)) {
                throw new Exception("Missing Information, Please provide (card number, cvv, name on card)");
            }
            $userId = $_SESSION['user'];
            $query = "INSERT INTO payments (card_number, cvv, name_on_card, user_id) VALUES (?, ?, ?, ?)";
            $statement = $this->mysqli->prepare($query); //for security
            $statement->bind_param("sssi", $card_number, $cvv, $name_on_card, $userId);
            $statement->execute();

            if ($statement->affected_rows === 0) {
                throw new Exception("Failed to create product");
            }

            $statement->close();
            http_response_code(201);
            return json_encode(["success" => "Payment created successfully"]);
        } catch (Exception $exception) {
            http_response_code(400);
            return json_encode(["error" => $exception->getMessage()]);
        }
    }
}