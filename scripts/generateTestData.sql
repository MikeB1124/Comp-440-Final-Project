use RestaurantDB;

INSERT INTO `Location` (`ID`, `Location_Name`, `Address`, `City`, `Postal_Code`, `State`, `Phone`) VALUES
(1, 'Main Street', '123 Main St', 'Cityville', 12345, 'CA', '1234567890');

INSERT INTO `Menu` (`ID`, `Location_ID`, `Menu_Name`, `Description`) VALUES
(1, 1, 'Main Menu', 'Our delicious main menu options');

INSERT INTO `Section` (`ID`, `Menu_ID`, `Section_Name`, `Description`) VALUES
(1, 1, 'Burgers', 'Juicy burgers made with fresh ingredients'),
(2, 1, 'Sides', 'Tasty side dishes to accompany your meal');

INSERT INTO `Item` (`ID`, `Section_ID`, `Item_Name`, `Description`, `Price`) VALUES
(1, 1, 'Classic Burger', 'Our classic beef burger with lettuce, tomato, and cheese', 5.99),
(2, 1, 'Chicken Burger', 'Grilled chicken breast burger with mayo and lettuce', 6.99),
(3, 2, 'French Fries', 'Crispy golden fries seasoned to perfection', 2.49),
(4, 2, 'Onion Rings', 'Crunchy onion rings served with dipping sauce', 3.49);

INSERT INTO Customers (name, email, phone_number) VALUES
    ('John Doe', 'john@example.com', '123-456-7890'),
    ('Jane Smith', 'jane@example.com', '987-654-3210'),
    ('Michael Johnson', 'michael@example.com', '456-789-0123'),
    ('Emily Brown', 'emily@example.com', '789-012-3456'),
    ('David Williams', 'david@example.com', '234-567-8901'),
    ('Sarah Wilson', 'sarah@example.com', '567-890-1234'),
    ('Chris Anderson', 'chris@example.com', '890-123-4567'),
    ('Jessica Martinez', 'jessica@example.com', '345-678-9012'),
    ('Kevin Taylor', 'kevin@example.com', '678-901-2345'),
    ('Amanda Jones', 'amanda@example.com', '012-345-6789');

INSERT INTO Orders (customer_id, order_time, total_amount, status) VALUES
    (1, '2024-04-05 10:00:00', 35.50, 'completed'),
    (2, '2024-04-05 11:30:00', 48.75, 'pending'),
    (3, '2024-04-06 12:45:00', 42.00, 'completed'),
    (4, '2024-04-07 15:20:00', 19.25, 'cancelled'),
    (1, '2024-04-07 18:00:00', 55.00, 'pending'),
    (2, '2024-04-08 09:30:00', 48.50, 'completed'),
    (3, '2024-04-08 12:15:00', 36.75, 'completed'),
    (4, '2024-04-09 14:40:00', 27.00, 'pending'),
    (1, '2024-04-09 17:10:00', 40.00, 'completed'),
    (2, '2024-04-10 11:00:00', 62.25, 'completed');

INSERT INTO Order_Items (order_id, menu_id, quantity, subtotal) VALUES
    (1, 1, 2, 20.00),
    (1, 1, 1, 15.50),
    (2, 1, 1, 12.75),
    (2, 1, 3, 30.00),
    (4, 1, 1, 10.50),
    (6, 1, 1, 10.50);

