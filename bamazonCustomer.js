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
	listitems();
});

var listitems = function() {
connection.query("SELECT * FROM products", function(err, result, fields) {
		if (err) console.log("Error " + err);
		for (var i=0; i<result.length; i++){
			console.log("Product ID: " + result[i].item_id + "\nProduct Name: "+ result[i].product_name + "\nPrice: " + result[i].price + "\nStock Quantity: " + result[i].stock_quantity + "\n----------------\n");
		}
		userprompt(result)
		})
		}
var userprompt = function(result) {
			inquirer.prompt([{
				type: 'input',
				name: 'productID',
				message: 'Enter the ID number of the product you wish to purchase. Press "X" to exit.'
			
			}]).then(function(answer){
				var correct = false;
				if (answer.productID.toUpperCase()=="X"){
					process.exit();
				}
		
			for (var i=0; i<result.length; i++){
				
				
			if (result[i].item_id==answer.productID){
					correct=true;
				console.log("Ah.., " + result[i].product_name + " a fine selection. We currently have " + result[i].stock_quantity + " left in stock.");
				var chosenItem = (result[i]);
				var stockQuantity = (result[i].stock_quantity);

				
				// Start of scope issue-------------------------------------------------------------------------------------------------
				var choice = answer.productID;
				// Inquirer.prompt start -------------------------------------------------------
				inquirer.prompt([{
					type: 'input',
					name: 'quantity',
					message: 'How many would you like to order?',
					validate: function(value){
	                		
	              		if(isNaN(value)==false){

	                		return true;
	                
	              		} else {
	                	return false;
                		
            			} 
            			}
					}]).then(function(answer){
					

					if(stockQuantity-answer.quantity>=0){
						connection.query("UPDATE products SET stock_quantity='" + stockQuantity - answer.quantity + "' WHERE productID= '"+ choice +"'", function(err, res2){
			                var newQuantity = (stockQuantity - answer.quantity);
			                console.log("");
			                console.log("-----------------------------------------------");
			                console.log("");
			                console.log("Thank you for your purchase. The total comes to $" + answer.quantity*result[i].price + ".");
			                console.log("");
			              
			                console.log("-----------------------------------------------");
			 				
			 		
	 					})
					}else{
						console.log("Sorry, we only have " + stockQuantity + " available for purchase.");
					}
				})
				

				break;
			}
		}

	})
	
};

