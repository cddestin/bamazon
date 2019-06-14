DROP DATABASE IF EXISTS bamazonDB; 

CREATE DATABASE bamazonDB;

USE bamazonDB;


CREATE TABLE products (
  productID int(4) NOT NULL AUTO_INCREMENT,
  productName varchar(100) NOT NULL,
  departmentName varchar(100) NOT NULL,
  Qty_On_Hand int(11) DEFAULT NULL,
  Qty_On_Hold int(11) DEFAULT NULL,
  Qty_Available int(11) DEFAULT NULL,
  Qty_On_Order int(11) DEFAULT NULL,
  Current_Level int(11) DEFAULT NULL,
  Target_Level int(11) DEFAULT NULL,
  price decimal(7,2) NOT NULL DEFAULT '99999.99',
  PRIMARY KEY (productID)

);

SELECT * FROM inventoryList

INSERT INTO products VALUES
(1,"Apples","PRODUCE",25,25,0,41,41,40),
(2,"Avocados","PRODUCE",50,0,50,50,100,100),
(3,"Bananas","PRODUCE",0,0,0,40,40,40),
(4,"Berries","PRODUCE",15,0,15,0,15,40),
(5,"Broccoli","PRODUCE",0,0,0,10,10,100),
(6,"Biscuits","DAIRY / FRIDGE",0,0,0,0,0,40),
(7,"Butter","DAIRY / FRIDGE",0,0,0,0,0,40),
(8,"Cheese","DAIRY / FRIDGE",40,0,40,0,40,40),
(9,"Cookie Dough","DAIRY / FRIDGE",0,0,0,0,0,40),
(10,"Cream Cheese","DAIRY / FRIDGE",0,0,0,20,20,20),
(11,"Chicken","FROZEN",0,0,0,40,40,40),
(12,"Desserts","FROZEN",0,0,0,0,0,20),
(13,"Dinners","FROZEN",23,23,0,0,0,60),
(14,"Fish","FROZEN",0,0,0,120,120,120),
(15,"Fruits","FROZEN",0,0,0,0,0,40),
(16,"Batteries","HOUSEHOLD",325,325,0,300,300,100),
(17,"Bleach","HOUSEHOLD",0,0,0,0,0,100),
(18,"Cards","HOUSEHOLD",0,0,0,40,40,40),
(19,"Charcoal","HOUSEHOLD",60,0,60,0,60,100),
(20,"Detergent","HOUSEHOLD",120,110,10,0,10,120),
(21,"Baby Food","BABY",80,0,80,0,80,80),
(22,"Diapers","BABY",40,0,40,0,40,40),
(23,"Formula","BABY",80,0,80,0,80,80),
(24,"Rash Cream","BABY",0,0,0,40,40,40),
(25,"Wipes","BABY",0,0,0,0,0,20),
(26,"Deodorant","PERSONAL",60,0,60,0,60,60),
(27,"Floss","PERSONAL",20,20,0,0,0,75),
(28,"Lotion","PERSONAL",125,75,50,0,50,125),
(29,"Mouthwash","PERSONAL",0,0,0,0,0,100),
(30,"Razor Blades","PERSONAL",0,0,0,0,0,200),
(31,"Shampoo","PERSONAL",0,0,0,10,10,20),
(32,"Shaving Cream","PERSONAL",0,0,0,0,0,20),
(33,"Soap","PERSONAL",0,0,0,0,0,50),
(34,"Toothbrush","PERSONAL",0,0,0,0,0,40),
(35,"Toothpaste","PERSONAL",0,0,0,0,0,40);