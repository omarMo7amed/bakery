<?php

class OrderService
{
    private mysqli $mysqli;
    public function __construct($mysqli)
    {
        $this->mysqli = $mysqli;
    }

    public function createOrder($totalPrice, $cart)
    {
        try {
            if (!isset($totalPrice, $cart) || empty($cart)) {
                throw new Exception("missing information");
            }

            $userId = $_SESSION['user'];
            $totalPrice = (int) $totalPrice;
            $query = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
            $statement = $this->mysqli->prepare($query);
            $statement->bind_param("id", $userId, $totalPrice);
            $statement->execute();

            if ($statement->affected_rows === 0) {
                throw new Exception("Failed to create product");
            }

            $orderId = $this->mysqli->insert_id;

            // too much?
            $productQuery = "INSERT INTO order_products (order_id, product_id, quantity) VALUES (?,?,?)";
            $productQueryStatement = $this->mysqli->prepare($productQuery);
            foreach ($cart as $item) {
                if (!isset($item['id'], $item['quantity'])) {
                    throw new Exception("Invalid cart item data");
                }

                $productId = (int) $item['id'];
                $quantity = (int) $item['quantity'];
                $productQueryStatement->bind_param('iii', $orderId, $productId, $quantity);
                $productQueryStatement->execute();

                if ($productQueryStatement->affected_rows === 0) {
                    throw new Exception("Failed to add product to order");
                }

            }
            http_response_code(201);
            return json_encode(["success" => true, "order_id" => $orderId]);

        } catch (Exception $exception) {
            http_response_code(400);

            return json_encode(["error" => $exception->getMessage()]);
        }
    }
    public function getUserOrderById($id)
    {
        try {
            $orderId = (int) $id;
            if (!isset($orderId) || !is_numeric($orderId)) {
                throw new Exception("Missing id or invalid");
            }

            $userId = (int) $_SESSION['user'];

            $query = "
            SELECT
                users.username,
                users.phone_number,
                users.address,
                orders.total_price,
                GROUP_CONCAT(
                    CONCAT(
                        '{\"product_id\":', products.id,
                        ',\"product_name\":\"', products.name, '\"',
                        ',\"quantity\":', order_products.quantity,
                        ',\"price\":', products.price,
                        ',\"image\":', products.image,
                        '}'
                    )
                ) AS products
            FROM users
            INNER JOIN orders ON orders.user_id = users.id
            INNER JOIN order_products ON orders.id = order_products.order_id
            INNER JOIN products ON products.id = order_products.product_id
            WHERE orders.id = $orderId AND users.id = $userId
            GROUP BY users.id, orders.id;
        ";

            $result = $this->mysqli->query($query);
            if (!$result) {
                throw new Exception("Error while fetching the order: " . $this->mysqli->error);
            }

            $userOrder = $result->fetch_assoc();
            if (!$userOrder) {
                throw new Exception("No order found for the given ID.");
            }

            // Decode the concatenated string into a proper JSON array
            $userOrder['products'] = json_decode("[" . $userOrder['products'] . "]");

            // Cast attributes to proper datatypes
            $userOrder['username'] = (string) $userOrder['username'];
            // $userOrder['email'] = (string) $userOrder['email'];
            $userOrder['phone_number'] = (string) $userOrder['phone_number'];
            $userOrder['address'] = (string) $userOrder['address'];
            $userOrder['total_price'] = (float) $userOrder['total_price'];

            foreach ($userOrder['products'] as &$product) {
                $product->product_id = (int) $product->product_id;
                $product->product_name = (string) $product->product_name;
                $product->quantity = (int) $product->quantity;
                $product->price = (float) $product->price;

                // Decode the JSON array of images
                // $product->images = array($product->image);
            }

            http_response_code(200);
            return json_encode($userOrder);

        } catch (Exception $exception) {
            http_response_code(400);
            return json_encode(["error" => $exception->getMessage()]);
        }
    }

}
