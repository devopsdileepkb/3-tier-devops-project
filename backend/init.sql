CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  price INT
);

INSERT INTO products VALUES
(1, 'Laptop', 55000),
(2, 'Mobile', 25000),
(3, 'Headphones', 3000);