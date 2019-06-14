var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost", 

  // Your port; if not 3306
  port: 3306,

  // your username
  user: "root",

  // your password

  password: "Pa55word123!",
  database: "bamazondb"
})

connection.connect(function(err){
if (err) throw err;
// queryAllProducts();
startPrompt();
});


//=================================Inquirer introduction===============================

function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            queryAllProducts();
        } else {
            console.log("Thank you! Come back soon!");
            connection.end();
        }
    });
}

//=================================Inventory===============================
function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;        
        var displayTable = new Table ({
            head: ["Product ID ",  "Name ",  "Department ",  "Qty On Hand ",  "Qty On Hold ",  "Qty Available ",  "Qty On Order ",  "Current Level ",  "Target Level ",  "Price "],
			colWidths: [10,15,18,18,18,18,18,18,18,10]
		});
        for (var i = 0; i < res.length; i++){
            displayTable.push([res[i].productID, res[i].productName, res[i].departmentName, res[i].Qty_On_Hand, res[i].Qty_On_Hold, res[i].Qty_Available, res[i].Qty_On_Order, res[i].Current_Level, res[i].Target_Level, res[i].price]);
            
        }
        console.log("");
        console.log("====================================================== Current Bamazon Inventory ======================================================");
        console.log("");
        console.log(displayTable.toString());    
        console.log("");    
        
        userPurchase();
        // connection.end();
    });
}

//=================================Inquirer user purchase===============================

function userPurchase(){
    inquirer.prompt([{

        type: "confirm",
        name: "continue",
        message: "Would you like to purchase an item?",
        default: true

    }]).then(function(user) {
        if (user.continue === true) {
            selectionPrompt();
        } else {
            console.log("Thank you! Come back soon!");
            
        }
    });
}

//=================================Item selection and Quantity desired===============================

function selectionPrompt() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Please enter the ID number of the item you would like to purchase.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many units of this item would you like to purchase?",

        }
    ]).then(function(userPurchase) {

        
        connection.query("SELECT * FROM products WHERE productID=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].Qty_Available) {

                    console.log("===================================================");
                    console.log("Sorry! Not enough in stock. Please try again later.");
                    console.log("===================================================");
                    startPrompt();

                } else {
                    //list item information for user for confirm prompt
                    console.log("===================================");
                    console.log("Awesome! We can fulfull your order.");
                    console.log("===================================");
                    console.log("You've selected:");
                    console.log("----------------");
                    console.log("Item: " + res[i].productName);
                    console.log("Department: " + res[i].departmentNname);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("----------------");
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("===================================");

                    var newStock = (res[i].Qty_Available - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    //console.log(newStock);
                    confirmPrompt(newStock, purchaseId);
                }
            }
        });
    });
}

//=================================Confirm Purchase===============================

function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                Qty_Available: newStock
            }, {
                productID: purchaseId
            }], function(err, res) {});

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
            startPrompt();
        } else {
            console.log("=================================");
            console.log("No worries. Maybe next time!");
            console.log("=================================");
            startPrompt();
        }
    });
}