CREATE DATABASE Blog;

USE Blog;

CREATE TABLE
    users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    posts(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        like_number INT DEFAULT 0,
        user_id INT,
        createaAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    comments(
        id INT PRIMARY KEY AUTO_INCREMENT,
        content TEXT,
        post_id INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    like_post(
        user_id INT,
        post_id INT,
        choice BOOLEAN,
        PRIMARY KEY (user_id, post_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    historic(
        id INT PRIMARY KEY AUTO_INCREMENT,
        content TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );