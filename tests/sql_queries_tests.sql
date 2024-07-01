SELECT * FROM users;
SELECT * FROM users WHERE id = 1;

INSERT INTO users (first_name, last_name, age, city, state)
VALUES ('John', 'Doe', 30, 'New York', 'NY');

UPDATE users
SET first_name = 'Jane', last_name = 'Smith', age = 28, city = 'Los Angeles', state = 'CA'
WHERE id = 1;

DELETE FROM users WHERE id = 1;


