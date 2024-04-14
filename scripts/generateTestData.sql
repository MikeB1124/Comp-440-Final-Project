use RestaurantDB;

INSERT INTO `Location` (`ID`, `Location_Name`, `Address`, `City`, `Postal_Code`, `State`, `Phone`) VALUES
(1, 'Main Street', '123 Main St', 'Cityville', 12345, 'CA', '1234567890'),
(2, 'Second Street', '123 Second St', 'Los Angeles', 12345, 'CA', '1234567890');

INSERT INTO `Section` (`ID`, `Location_ID`, `Section_Name`, `Description`) VALUES
(1, 1, 'Burgers', 'Juicy burgers made with fresh ingredients'),
(2, 1, 'Sides', 'Tasty side dishes to accompany your meal');

INSERT INTO `Item` (`ID`, `Section_ID`, `Item_Name`, `Description`, `Image_Url`, `Price`) VALUES
(1, 1, 'Classic Burger', 'Our classic beef burger with lettuce, tomato, and cheese', 'www.example.com', 5.99),
(2, 1, 'Chicken Burger', 'Grilled chicken breast burger with mayo and lettuce', 'www.example.com', 6.99),
(3, 2, 'French Fries', 'Crispy golden fries seasoned to perfection', 'www.example.com', 2.49),
(4, 2, 'Onion Rings', 'Crunchy onion rings served with dipping sauce', 'www.example.com', 3.49);