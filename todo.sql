SET SQL_SAFE_UPDATES = 0;
CREATE TABLE user (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    receiveEmail BOOLEAN NOT NULL DEFAULT FALSE,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user (firstName, lastName, email, password, receiveEmail, reg_date) VALUES (
"T", "F", "J", "D", false, "2020-05-18 13:37:04"
);
INSERT INTO user (firstName, lastName, email, password, receiveEmail, reg_date) VALUES (
"T", "F", "J1", "D", false, "2020-05-18 13:37:04"
);

UPDATE user 
SET 
    verified = FALSE
WHERE
    email = 'singhtalwinder34@yahoo.com';
    
UPDATE user 
SET 
    verified = TRUE
WHERE
    email = 'singhtalwinder34@yahoo.com';
    
SELECT 
    *
FROM
    user;
CALL dropUser();
CALL truncateUser();

CREATE TABLE refreshToken (
    userId INT NOT NULL,
    refreshToken VARCHAR(500) NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES user (userId)
        ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT 
    *
FROM
    refreshToken;
DROP TABLE refreshToken;
TRUNCATE TABLE refreshToken;

/*YYYY-MM-DD HH:MM:SS*/

CREATE TABLE pendingTodo (
    userId INT NOT NULL,
    description VARCHAR(25) NOT NULL,
    dateTime TIMESTAMP NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId)
        REFERENCES user (userId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (userId , reg_date)
);

SELECT 
    *
FROM
    pendingTodo;
    
DROP TABLE pendingTodo;
TRUNCATE TABLE pendingTodo;

CREATE TABLE finishedTodo (
    userId INT NOT NULL,
    description VARCHAR(25) NOT NULL,
    dateTime TIMESTAMP NOT NULL,
    reg_date TIMESTAMP NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES user (userId)
        ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (userId , reg_date)
);

INSERT INTO finishedTodo SELECT *FROM pendingTodo 
WHERE 
	userId = 1 
	AND reg_date="2020-05-17 20:46:07";
    
DELETE FROM pendingTodo 
WHERE
    userId = 1
    AND reg_date = '2020-05-17 20:46:truncateUsertruncateUsertruncateUsertruncateUser07';
         
SELECT 
    *
FROM
    finishedTodo;
DROP TABLE finishedTodo;
TRUNCATE TABLE finishedTodo;

CREATE USER 'todo'@'localhost' IDENTIFIED BY 'todo';
GRANT ALL PRIVILEGES ON todo.* TO 'todo'@'localhost';
SHOW GRANTS FOR 'todo'@'localhost';
ALTER USER 'todo'@'localhost' IDENTIFIED WITH mysql_native_password BY 'todo';
flush privileges;
