CREATE DATABASE RestaurantDB;
USE RestaurantDB;

CREATE TABLE `Location` (
    `ID` INT,
    `Location_Name` VARCHAR(20),
    `Address` VARCHAR(50),
    `City` VARCHAR(50),
    `Postal_Code` INT,
    `State` VARCHAR(2),
    `Phone` VARCHAR(10),
    PRIMARY KEY (`ID`)
);

CREATE TABLE `Menu` (
    `ID` INT,
    `Location_ID` INT,
    `Menu_Name` VARCHAR(20),
    `Description` VARCHAR(200),
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`LOCATION_ID`) REFERENCES `Location`(`ID`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `Section` (
    `ID` INT,
    `Menu_ID` INT,
    `Section_Name` VARCHAR(20),
    `Description` VARCHAR(200),
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`Menu_ID`) REFERENCES `Menu`(`ID`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `Item` (
    `ID` INT,
    `Section_ID` INT,
    `Item_Name` VARCHAR(20),
    `Description` VARCHAR(200),
    `Price` DECIMAL(6,2),
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`Section_ID`) REFERENCES `Section`(`ID`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    PRIMARY KEY (customer_id)
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT,
    customer_id INT,
    order_time DATETIME,
    total_amount DECIMAL(10, 2),
    status ENUM('pending', 'completed', 'cancelled'),
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT,
    order_id INT,
    menu_id INT,
    quantity INT,
    subtotal DECIMAL(10, 2),
    PRIMARY KEY (order_item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES Menu(ID)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);