INSERT INTO users (username, email, phone_number, address, role) VALUES
('JohnDoe', 'john@example.com', '1234567890', '123 Main St, Cityville', 'user'),
('JaneSmith', 'jane@example.com', '9876543210', '456 Elm St, Townsville', 'user'),
('AliceBrown', 'alice@example.com', '5678901234', '789 Oak St, Villagetown', 'user'),
('BobWhite', 'bob@example.com', '3456789012', '101 Pine St, Hamletburg', 'user'),
('CharlieGreen', 'charlie@example.com', '2345678901', '202 Birch St, Smallville', 'user'),
('DaisyBlue', 'daisy@example.com', '6789012345', '303 Cedar St, Bigcity', 'user'),
('EveYellow', 'eve@example.com', '8901234567', '404 Maple St, Riverside', 'user'),
('FrankBlack', 'frank@example.com', '1238904567', '505 Spruce St, Hilltown', 'user'),
('GracePurple', 'grace@example.com', '4567890123', '606 Willow St, Lakeside', 'user'),
('HankOrange', 'hank@example.com', '7890123456', '707 Cherry St, Mountainview', 'user');

INSERT INTO orders (user_id, total_price) VALUES
(1, 150.50),
(2, 85.75),
(3, 42.00),
(4, 120.25),
(5, 97.80),
(6, 60.00),
(7, 190.90),
(8, 34.20),
(9, 240.15),
(10, 15.00);

INSERT INTO categories (name, description) VALUES
('Bread', 'Freshly baked bread of various types.'),
('Cake', 'Delicious cakes for all occasions.'),
('Cookies', 'Crunchy and soft cookies in multiple flavors.'),
('Cupcakes', 'Sweet and savory pies made with fresh ingredients.'),


INSERT INTO products (name, description, price, image, quantity, ingredients, offers, rate, category_id, category_name) VALUES
('Honey Wheat Bread', 'Delicious honey wheat bread, with a soft and fluffy texture, perfect for breakfast or sandwiches, made with wholesome ingredients, it stays fresh and tasty all day.', 4.00, JSON_ARRAY('./assests/images/products/single-product-05.webp', './assests/images/products/single-product-06.webp'), 45, 'Whole wheat flour, honey, yeast, water, salt', TRUE, 5, 1, 'Bread'),

('Chocolate Chip Cookies', 'Classic chocolate chip cookies, with a golden, crispy edge, a chewy center, and loaded with chocolate chips, a perfect treat, for any occasion or tea time.', 2.00, JSON_ARRAY('./assests/images/products/single-product-07.webp', './assests/images/products/single-product-08.webp', './assests/images/products/single-product-09.webp'), 80, 'Flour, sugar, butter, chocolate chips, eggs, baking powder', FALSE, 4, 3, 'Cookies'),

('Vegan Blueberry Muffins', 'Soft and moist vegan blueberry muffins, made with fresh blueberries, plant-based ingredients, and a hint of lemon zest, making it a delicious, guilt-free snack.', 3.50, JSON_ARRAY('./assests/images/products/single-product-10.webp', './assests/images/products/single-product-11.webp'), 40, 'Flour, blueberries, almond milk, baking soda, lemon zest', TRUE, 5, 2, 'Cake'),

('Butter Croissants', 'Freshly baked butter croissants, flaky on the outside, soft on the inside, perfect for breakfast, served warm, with a buttery aroma that is irresistible, and satisfying.', 2.50, JSON_ARRAY('./assests/images/products/single-product-12.webp', './assests/images/products/single-product-13.webp', './assests/images/products/single-product-14.webp'), 90, 'Flour, butter, yeast, salt', FALSE, 4, 1, 'Bread'),

('Red Velvet Cupcake', 'A moist red velvet cupcake, with a rich cocoa flavor, topped with creamy cheese frosting, made with high-quality ingredients, and perfect for a delightful dessert.', 3.00, JSON_ARRAY('./assests/images/products/single-product-15.webp', './assests/images/products/single-product-16.webp'), 30, 'Flour, cocoa, eggs, cream cheese, butter', FALSE, 4, 2, 'Cake'),

('Banana Walnut Bread', 'This bread, with a rich banana flavor, and crunchy walnut bits, is moist, sweet, and healthy, perfect as a morning snack, or an afternoon treat.', 5.00, JSON_ARRAY('./assests/images/products/single-product-01.webp', './assests/images/products/single-product-02.webp'), 25, 'Banana, walnuts, flour, sugar, butter, baking soda', TRUE, 5, 1, 'Bread'),

('Sugar Cookies', 'Light and sweet sugar cookies, with a crunchy texture, decorated with colorful sugar sprinkles, perfect for sharing, during holidays or celebrations.', 1.50, JSON_ARRAY('./assests/images/products/single-product-03.webp', './assests/images/products/single-product-04.webp', './assests/images/products/single-product-05.webp'), 100, 'Flour, sugar, butter, eggs, vanilla', FALSE, 4, 3, 'Cookies'),

('Chocolate Brownie', 'Rich chocolate brownies, with a fudgy center, crispy edges, and loaded with dark chocolate chunks, perfect for chocoholics, looking for an indulgent treat.', 3.00, JSON_ARRAY('./assests/images/products/single-product-06.webp', './assests/images/products/single-product-07.webp', './assests/images/products/single-product-08.webp', './assests/images/products/single-product-09.webp'), 50, 'Flour, cocoa, dark chocolate, sugar, butter, eggs', TRUE, 5, 4, 'Cupcakes'),

('Pumpkin Pie', 'This seasonal pumpkin pie, is creamy, spiced with cinnamon, and topped with whipped cream, perfect for Thanksgiving, or a cozy autumn dessert.', 8.00, JSON_ARRAY('./assests/images/products/single-product-10.webp', './assests/images/products/single-product-11.webp', './assests/images/products/single-product-12.webp'), 35, 'Pumpkin, cinnamon, sugar, flour, eggs', FALSE, 4, 4, 'Cupcakes'),

('Ham & Cheese Sandwich', 'A classic ham and cheese sandwich, served on fresh bread, with melted cheese, and savory ham, toasted to perfection, ideal for a quick, hearty meal.', 6.00, JSON_ARRAY('./assests/images/products/single-product-13.webp', './assests/images/products/single-product-14.webp'), 70, 'Bread, ham, cheese, butter', FALSE, 3, 4, 'Cupcakes'),

('Vanilla Cupcake', 'Soft vanilla cupcakes, with creamy vanilla frosting, decorated with sprinkles, made with fresh, high-quality ingredients, a delightful dessert, for all occasions.', 2.50, JSON_ARRAY('./assests/images/products/single-product-15.webp', './assests/images/products/single-product-16.webp', './assests/images/products/single-product-01.webp'), 40, 'Flour, sugar, eggs, vanilla, butter', FALSE, 4, 2, 'Cake'),

('Almond Cookies', 'Crunchy almond cookies, with a nutty flavor, lightly sweetened, and perfect for tea time, made with ground almonds, they are both healthy, and delicious.', 2.00, JSON_ARRAY('./assests/images/products/single-product-02.webp', './assests/images/products/single-product-03.webp'), 85, 'Almonds, flour, sugar, eggs', FALSE, 5, 3, 'Cookies'),

('Spinach Vegan Wrap', 'Healthy spinach wraps, made with fresh veggies, a plant-based spread, and wrapped in spinach tortillas, for a nutritious and, flavorful vegan option.', 7.50, JSON_ARRAY('./assests/images/products/single-product-04.webp', './assests/images/products/single-product-05.webp', './assests/images/products/single-product-06.webp'), 40, 'Spinach tortillas, vegetables, plant spread', TRUE, 5, 4, 'Cupcakes'),

('Gluten-Free Lemon Cake', 'This gluten-free lemon cake, with a moist texture, a zesty lemon flavor, topped with lemon glaze, perfect for those avoiding gluten, while enjoying a sweet treat.', 4.50, JSON_ARRAY('./assests/images/products/single-product-07.webp', './assests/images/products/single-product-08.webp'), 30, 'Rice flour, lemon zest, sugar, eggs', TRUE, 5, 2, 'Cake');


INSERT INTO order_products (order_id, product_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10);

INSERT INTO payments (card_number, cvv, name_on_card, user_id) VALUES
('1111222233334444', '123', 'John Doe', 1),
('5555666677778888', '456', 'Jane Smith', 2),
('9999000011112222', '789', 'Alice Brown', 3),
('3333444455556666', '321', 'Bob White', 4),
('7777888899990000', '654', 'Charlie Green', 5),
('1111333344445555', '987', 'Daisy Blue', 6),
('2222444466668888', '234', 'Eve Yellow', 7),
('4444555566667777', '567', 'Frank Black', 8),
('5555666677778888', '890', 'Grace Purple', 9),
('6666777788889999', '012', 'Hank Orange', 10);
