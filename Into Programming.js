// Variables store values that can change over time
// Think of them as labeled jars holding different data
let price = 59.99;
let quantity = 2;
let total = price * quantity;

console.log("Total cost:", total); // Total cost: 119.98

// Expressions evaluate to values and can be reused
// Below, we're assigning the result of a math operation to a variable
let bonus = 15 + 5;
let finalBonus = bonus;
console.log(finalBonus); // 20

// Statements are complete instructions ending with ;
// They tell the computer what to do in each step
let greeting = "Welcome to the store!";
console.log(greeting);

// Functions are reusable chunks of code
// Call them with () to run the wrapped logic
function showPrice(amount) 
{
	console.log("Final amount: $" + amount.toFixed(2));
}

showPrice(120.499); // Final amount: $120.50

// Coercion is converting values between types
// Strings can become numbers and vice versa
let raw = "42";
let converted = Number(raw);
console.log(typeof raw, typeof converted); // string number

// Conditionals allow branching logic
// If a condition is true, run the associated block
let funds = 200;
let cart = 150;

if (cart < funds) 
{
	console.log("Purchase approved.");
} 
else 
{
	console.log("Insufficient balance.");
}

// Loops repeat actions while a condition is true
// Great for counting or processing items in batches
for (let i = 1; i <= 3; i++) 
{
	console.log("Processing order #" + i);
}

// Constants are fixed values that don’t change
// Use `const` for values like tax rates or limits
const TAX_RATE = 0.1;
let subtotal = 80;
let tax = subtotal * TAX_RATE;
console.log("Tax:", tax.toFixed(2)); // Tax: 8.00

// Comments explain your code for humans
// They help others (and future you!) understand why
let username = "Neo"; // The Matrix reference

/*
Multi-line comments are useful when
you need more detailed explanation.
This section formats a value with $.
*/
function formatMoney(val) 
{
	return "$" + val.toFixed(2);
}

console.log(formatMoney(99.95)); // $99.95

// Scope controls variable visibility
// Variables inside a function can’t be seen outside
function outerScope() 
{
	let a = 100;

	function innerScope() 
    {
		let b = 50;
		console.log(a + b); // 150
	}
	innerScope();
}

outerScope();

// full example of combining concepts
const ACCESSORY_COST = 19.99;
let balance = 300;
let phone = 99.99;
let spent = 0;

function addTax(amount) {
	return amount * TAX_RATE;
}

function format(amount) {
	return "$" + amount.toFixed(2);
}

// Loop until we run out of money
while (spent + phone < balance) {
	spent += phone;

	if (spent < 250) {
		spent += ACCESSORY_COST;
	}
}

spent += addTax(spent);

console.log("Total spent:", format(spent));
if (spent > balance) {
	console.log("You can't afford this purchase.");
}
