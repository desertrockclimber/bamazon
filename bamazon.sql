DROP database if exists bamazonDB;

create database bamazonDB;

use bamazonDB;

create table products (
item_id integer(10) NOT NULL,
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price Decimal (10,4) NULL,
stock_quantity integer(50) NULL,

primary key(item_id)

);




