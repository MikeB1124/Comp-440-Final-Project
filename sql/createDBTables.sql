CREATE DATABASE RestaurantDB;
USE RestaurantDB;

CREATE TABLE `Location` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Location_Name` VARCHAR(30) NOT NULL,
    `Address` VARCHAR(50) NOT NULL,
    `City` VARCHAR(50) NOT NULL,
    `Postal_Code` INT,
    `State` VARCHAR(10) NOT NULL
    	CHECK (LENGTH(`State`) = 2),
    `Phone` VARCHAR(20) NOT NULL
        CHECK (LENGTH(`Phone`) = 10 AND `Phone` REGEXP "^[0-9]+$"),
    `Created_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `Updated_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    UNIQUE (`Location_Name`)
);

CREATE TABLE `Section` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Location_ID` INT NOT NULL,
    `Section_Name` VARCHAR(20) NOT NULL,
    `Description` VARCHAR(200) NOT NULL,
    `Created_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `Updated_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`LOCATION_ID`) REFERENCES `Location`(`ID`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE `Item` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Section_ID` INT NOT NULL,
    `Item_Name` VARCHAR(40) NOT NULL,
    `Description` VARCHAR(200) NOT NULL,
    `Image_Url` VARCHAR(400) NOT NULL,
    `Price` DECIMAL(6,2) NOT NULL
        CHECK (`Price` > 0.00),
    `Created_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `Updated_At` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`Section_ID`) REFERENCES `Section`(`ID`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE INDEX index_location_name ON Location(Location_Name);
CREATE INDEX index_section_name ON Section(Section_Name);
CREATE INDEX index_item_name ON Item(Item_Name);
CREATE INDEX index_item_price ON Item(Price);