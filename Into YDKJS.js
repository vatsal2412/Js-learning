//Lexical Scope: Variables are accessible based on where they're declared
// Think of it like rooms inside a house — children can see parent's space
function outer() 
{
	let outside = "Parent";

	function inner() 
    {
		let inside = "Child";
		console.log(outside); // accessible
	}
	inner();
	// console.log(inside); // ReferenceError: inside is not defined
}
outer();


//Closures: Inner functions "remember" outer scope even after it's gone
// Used heavily in callbacks, modules, and asynchronous logic
function counter() 
{
	let count = 0;
	return function () 
    {
		count++;
		console.log("Current count:", count);
	};
}

let clickCounter = counter();
clickCounter(); // 1
clickCounter(); // 2


//this Keyword: `this` is dynamic, based on how a function is called
// It's not about where it's defined, but how it's invoked
let profile = 
{
	name: "Lena",
	speak() 
    {
		console.log("Hello, I'm", this.name);
	}
};

profile.speak(); // "Hello, I'm Lena"
let speakFn = profile.speak;
speakFn(); // "Hello, I'm undefined" or window/global context


//call, apply, bind: Control `this` context manually
function introduce(role) {
	console.log(`${this.name} is a ${role}`);
}

const person = { name: "Karan" };
introduce.call(person, "designer"); // Karan is a designer


//Object Prototype Delegation
// Objects can delegate behavior to another using __proto__ or Object.create
const baseSkills = 
{
	coding() 
    {
		console.log("I can write JavaScript.");
	}
};

const dev = Object.create(baseSkills);
dev.coding(); // I can write JavaScript.


//Type Coercion: JS converts types automatically during comparison
// Often misunderstood — but predictable with clear rules
console.log("42" == 42); // true (loose equality)
console.log("42" === 42); // false (strict equality)


//Truthy vs Falsy Values
// Used in conditionals; falsy values include "", 0, null, undefined, NaN, false
let token = "";
if (!token) 
{
	console.log("No token provided.");
}


//  Implicit coercion in arithmetic or logic
// JS tries to make sense of operands depending on the operator
console.log("10" * 2); // 20
console.log([] + 1);   // "1" — array becomes string

// Promises: Handle future values with cleaner async flow
// Avoids callback hell and allows chaining
function fetchUser() 
{
	return new Promise(resolve => 
    {
		setTimeout(() => resolve("Neha"), 500);
	});
}

fetchUser().then(name => 
{
	console.log("Fetched user:", name);
});


//Generator: Functions that pause and resume
// Useful for sequential async code or lazy sequences
function* steps() {
	yield "Start";
	yield "Middle";
	yield "End";
}

const walk = steps();
console.log(walk.next().value); // Start
console.log(walk.next().value); // Middle


//ES6 Feature: let and const have block scope
{
	let x = "scoped";
	console.log(x);
	// Outside this block, x won't be accessible
}


//ES6 Feature: Arrow functions preserve `this` from surrounding scope
const team = {
	name: "DevSquad",
	members: ["Sam", "Lee"],
	listMembers() {
		this.members.forEach(member => {
			console.log(`${member} is part of ${this.name}`);
		});
	}
};
team.listMembers();


//ES6 Feature: Destructuring
const settings = { theme: "dark", layout: "grid" };
const { theme } = settings;
console.log(theme); // "dark"


//ES6 Feature: Template literals for easier string building
let userName = "Ravi";
console.log(`Hello, ${userName}! Welcome.`);



