SHOW INDEX FROM location;

SELECT CONSTRAINT_NAME, TABLE_NAME, CONSTRAINT_TYPE 
FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_NAME = 'location';