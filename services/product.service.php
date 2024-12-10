<?php

class ProductService
{
    private $mysqli;

    public function __construct(mysqli $mysqli)
    {
        $this->mysqli = $mysqli;
    }

    public function getAllProducts()
    {
        try {
            $query = "SELECT * FROM products";
            $result = $this->mysqli->query(query: $query);
            if (!$result) {
                throw new Exception("Error while fetching all products: " . $this->mysqli->error);
            }

            $products = [];

            while ($row = $result->fetch_assoc()) {
                $row['id'] = (int) $row['id'];
                $row['price'] = (float) $row['price'];
                $row['quantity'] = (int) $row['quantity'];
                $row['offers'] = (int) $row['offers'];
                $row['rate'] = (int) $row['rate'];
                $row['image'] = json_decode($row['image']);
                $row['category_id'] = (int) $row['category_id'];
                $products[] = $row;
            }

            $result->free();

            http_response_code(200);
            return json_encode($products);


        } catch (Exception $exception) {
            http_response_code(400);
            json_encode(["error" => $exception->getMessage()]);
        }

    }

    public function getProductById($id)
    {
        try {
            if (!$id) {
                throw new Exception("Missing Id, please make sure that u provide an id");
            }
            $id = $this->mysqli->real_escape_string($id);
            $query = "SELECT * FROM products WHERE id = $id";
            $result = $this->mysqli->query($query);

            if (!$result) {
                throw new Exception("Error executing query: " . $this->mysqli->error);
            }
            if ($result->num_rows === 0) {
                throw new Exception("Product not found for ID: $id");
            }

            $product = $result->fetch_assoc();

            $product['id'] = (int) $product['id'];
            $product['price'] = (float) $product['price'];
            $product['quantity'] = (int) $product['quantity'];
            $product['offers'] = (bool) $product['offers'];
            $product['rate'] = (int) $product['rate'];
            $product['image'] = json_decode($product['image']);
            $product['category_id'] = (int) $product['category_id'];

            // بنضف الميموري
            $result->free();

            http_response_code(200);
            return json_encode($product);

        } catch (Exception $exception) {
            http_response_code(400);
            return json_encode(["error" => $exception->getMessage()]);
        }
    }
    public function updateProduct($id, $price, $quantity)
    {
        try {
            $product = $this->getProductById($id);

            $product = json_decode($product, true);

            $price = $price !== null ? $price : $product['price'];
            $quantity = $quantity !== null ? $quantity : $product['quantity'];

            $query = "UPDATE products SET price = ?, quantity = ? WHERE id = ?";
            $statement = $this->mysqli->prepare($query);
            $statement->bind_param('dii', $price, $quantity, $id);
            $statement->execute();

            if ($statement->affected_rows === 0) {
                throw new Exception("No rows were updated. Please check if the product ID is correct.");
            }
            $statement->close();
            http_response_code(200);
            return json_encode(["success" => "Product updated successfully."]);
        } catch (Exception $exception) {
            return json_encode(["error" => $exception->getMessage()]);
        }
    }
    public function deleteProductById($id)
    {
        try {
            if (!$id) {
                throw new Exception("Missing Id, please make sure that u provide an id");
            }

            $id = $this->mysqli->real_escape_string($id);

            $query = "DELETE FROM products WHERE id = $id";
            $result = $this->mysqli->query($query);

            if (!$result) {
                throw new Exception("Error executing query: " . $this->mysqli->error);
            }
            if ($this->mysqli->affected_rows === 0) {
                throw new Exception("No product found with ID: $id");
            }

            http_response_code(200);
            return json_encode(["success" => "Product deleted successfully."]);
        } catch (Exception $exception) {
            http_response_code(500);
            return json_encode(["error" => $exception->getMessage()]);
        }
    }
    public function createProduct($name, $description, $price, $image, $quantity, $ingredients, $offers, $rate, $category_id, $category_name)
    {
        try {
            // $image = json_encode($image);
            $query = "INSERT INTO products (name, description, price, image, quantity, ingredients, offers, rate, category_id, category_name) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            if (!isset($name, $description, $price, $image, $quantity, $ingredients, $offers, $rate, $category_id, $category_name)) {
                throw new Exception("Missing information, Please provide: name, description, price, image, quantity, ingredients, offers, rate, category_id, category_name");
            }
            $statement = $this->mysqli->prepare($query);
            $statement->bind_param(
                'ssdsisiiis',
                $name,
                $description,
                $price,
                $image,
                $quantity,
                $ingredients,
                $offers,
                $rate,
                $category_id,
                $category_name
            );
            $statement->execute();

            if ($statement->affected_rows === 0) {
                throw new Exception("Failed to create product.");
            }
            $statement->close();
            http_response_code(201);
            return json_encode(["success" => "Product created successfully."]);

        } catch (Exception $exception) {
            http_response_code(500);
            return json_encode(["error" => $exception->getMessage()]);
        }
    }
}