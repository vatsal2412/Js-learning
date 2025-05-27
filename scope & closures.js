//  Scope - variable access is governed by where they're declared
// Inner `let` shadows outer one - you see different outputs
let tool = "Brush";
{
	let tool = "Toothpaste";
	console.log("Inside block:", tool); //Toothpaste
}
console.log("Outside block:", tool); // Brush

//  let/const block scoping and immutability
// `let` creates block-level variables, `const` locks their value
{
	let age = 20;
	const name = "Vatsal";
	console.log(`User: ${name}, Age: ${age}`);
}

//  Arrow functions and concise body
// Arrow function shortens the syntax and inherits `this`
let greet = name => `Hello, ${name}!`;
console.log(greet("Vatsal"));

//  IIFE for data privacy
// IIFE helps avoid polluting the global scope
(function () 
{
	let secret = "This is private";
	console.log("Accessing secret inside IIFE:", secret);
})();
// console.log(secret); // Error: secret is not defined

//  Block scope via let inside condition
// Let variables don't leak out of the block
if (true) 
    {
	    let points = 100;
	    console.log("Points inside if:", points);
    }
// console.log(points); // Error: points is not defined

//  Hoisting - declarations move up, not initializations
// Variables declared with `var` get hoisted as undefined
console.log(project); // undefined
var project = "Build App";

//  Function declarations hoist fully
// Functions can be called before their declaration
sayHello(); 
function sayHello() 
{
	console.log("Hello before declaration!");
}

//  Closures - inner functions remember outer variables
// This allows state to persist even after outer function ends
function createCounter() 
{
	let count = 0;
	return function () 
    {
		count++;
		console.log("Current count:", count);
	};
}
const counter = createCounter();
counter(); // 1
counter(); // 2

//  Closure used in loop with let (block scope)
// Each function remembers its own `i` because of `let`
for (let i = 1; i <= 3; i++) 
    {
	    setTimeout(() => 
            {
		        console.log("Timer", i); // Prints 1, 2, 3
	        }, i * 100);
    }

//  Module pattern using closure
// Keeps data private and exposes only necessary methods
function UserModule() 
{
	let user = "Guest";
	function setName(name) 
    {
		user = name;
	}
	function greetUser() 
    {
		console.log("Welcome,", user);
	}
	return { setName, greetUser };
}
const user = UserModule();
user.setName("Vatsal");
user.greetUser(); // Welcome, Vatsal

//  Arrow function with map
// Arrow functions are clean and ideal for short callbacks
let nums = [1, 2, 3];
let doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6]




