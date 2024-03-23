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

