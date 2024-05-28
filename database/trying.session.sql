-- show
SELECT * FROM categories;
SELECT * FROM expenseCap;
SELECT * FROM users;
SELECT * FROM activity;


--user
CREATE USER 'steven'@'10.84.4.187' IDENTIFIED BY 'Simple-123';
GRANT ALL PRIVILEGES ON mysql.* TO 'steven'@'10.84.4.187';
FLUSH PRIVILEGES;

DROP USER 'steven'@'host';

SELECT user, host FROM mysql.user;

SHOW VARIABLES LIKE 'HOST';

DROP TABLE users;
DROP TABLE categories;
DROP TABLE goals;
DELETE FROM categories;
DELETE FROM goals;
DELETE FROM users;

--creating the tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    user VARCHAR(100),
    FOREIGN KEY (user) REFERENCES users(username)
);

CREATE TABLE expenseCap (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cap INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    user VARCHAR(100),
    FOREIGN KEY (user) REFERENCES users(username)
);

CREATE TABLE activity (
	id INT AUTO_INCREMENT PRIMARY KEY,
    act_date DATE NOT NULL,
    merchant VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    username VARCHAR(50) NOT NULL,
    category VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username),
	  FOREIGN KEY (category) REFERENCES categories(category)
);

CREATE INDEX idx_category ON categories(category)