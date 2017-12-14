// **Create a MySQL Database called bamazon.
// **Then create a Table inside of that database called products.
// **The products table should have each of the following columns:
// **item_id (unique id for each product)
// **product_name (Name of product)
// **department_name
// **price (cost to customer)
// **stock_quantity (how much of the product is available in stores)
// **Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
// **Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// **The app should then prompt users with two messages.
// **The first should ask them the ID of the product they would like to buy.
// **The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
var prompt = require("prompt");
var colors = require("colors/safe");
var colors = require('colors');

var connection = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "root",
	database: "bamazonDB"
})

connection.connect(function(err){
	if (err) console.log("Error: " + err);
	console.log("connected!");
	console.log(" ");
	console.log(" ");
	console.log("---------Products For Sale-------------------");
	console.log(" ");
	connection.query("SELECT * FROM products", function(err, result, fields) {
		if (err) console.log("Error " + err);
		for (var i=0; i<result.length; i++){
			console.log("Product ID: " + result[i].item_id + "\nProduct Name: "+ result[i].product_name + "\nPrice: " + result[i].price + "\n----------------\n");
		}
	// --------------------------------------------------------------------------------------------------------------------------------
		// var placeOrder = [
		// 		{
		// 		type: 'input',
		// 		name: 'productID',
		// 		message: 'Enter the ID number of the product you wish to purchase',
		// 		}

		// 		// {
		// 		// type: 'input',
		// 		// name: 'productQuantity',
		// 		// message: 'How many do you want to order?',
		// 		// }
		// ];
		// inquirer.prompt([placeOrder]).then(function(answers) {
		// console.log(JSON.stringify(answers, null, ' '));
	// });
// });
// ----------------------------------------------------------------------------------------------------------------------------------------
  // Setting these properties customizes the prompt. 
  // 
  prompt.message = colors.bgBlue("Welcome to our store. To place an order, enter the ID number of the product you wish to purchase.");
  prompt.delimiter = colors.green("><");
 	
  prompt.start();
 
  prompt.get({
    properties: {
      name: {
        description: colors.magenta("Enter Product ID number:")

      }
    }
  }, function (err, result) {
    
 

prompt.message = colors.bgBlue("Item number " + result.name + " is an excellent choice. How many would you like to purchase?");
  prompt.delimiter = colors.green("><");

// prompt.start();
 
  prompt.get({
    properties: {
      quantity: {
        description: colors.magenta("\nEnter Item quantity: ")
      }
    }
  }, function (err, result) {
    console.log(colors.cyan("Let me check our availabilty."));

    var checkInventory = function(){
    if (result.quantity <= result.stock_quantity) {
    	console.log("We have enough");
    };
	};
  });
 });
});
});

