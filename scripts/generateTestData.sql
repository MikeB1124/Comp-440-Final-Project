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
