// 1. Default Binding (non-strict mode)
// If no other rule applies, `this` points to the global object (window in browsers)
function showAge() 
{
	console.log(this.age);
}
var age = 25;
showAge(); // 25 in non-strict mode (global `age`)


// 2. Default Binding (strict mode)
// In strict mode, default `this` becomes undefined instead of global.
function strictShow() 
{
	"use strict";
	console.log(this); // undefined
}
strictShow();


//3. Implicit Binding
// When a function is called as a property on an object, `this` points to that object.
function displayCity() 
{
	console.log(this.city);
}
const user = 
                {
	                city: "Mumbai",
	                show: displayCity
                };
user.show(); // Mumbai


// 4. Implicitly Lost Binding
// When you assign a method to another variable, `this` defaults again to global or undefined.
const lost = user.show;
lost(); // undefined (strict) or global object


//5. Callback Confusion (implicit loss again)
// Passing a method as a callback can lose its original context.
function logSkill() 
{
	console.log(this.skill);
}
const dev = 
{
	skill: "JavaScript",
	log: logSkill
};
setTimeout(dev.log, 500); // undefined or global


// 6. Explicit Binding with .call()
// You can force `this` using `.call(obj)` — great for reusing logic.
function introduce() 
{
	console.log("I am " + this.name);
}
const teacher = { name: "Meera" };
introduce.call(teacher); // I am Meera


//7. Explicit Binding with .apply()
// Works like `.call()`, but uses an array for parameters.
function greet(greeting, punctuation) 
{
	console.log(greeting + " " + this.name + punctuation);
}
const host = { name: "Raj" };
greet.apply(host, ["Welcome", "!"]); // Welcome Raj!


//8. Hard Binding with Wrapper Function
// Locks a function’s `this` to an object regardless of how it's called.
function sayFood() 
{
	console.log("Favorite:", this.food);
}
const foodLover = { food: "Pav Bhaji" };
const locked = function() 
{
	sayFood.call(foodLover);
};
locked(); // Favorite: Pav Bhaji
setTimeout(locked, 300); // Always the same


//9. Hard Binding with `bind()`
// `bind()` creates a permanent connection between function and `this`.
const permanent = sayFood.bind(foodLover);
permanent(); // Favorite: Pav Bhaji


//10. Soft Binding (fallback if `this` is missing)
// Uses fallback only if `this` isn't otherwise set.
Function.prototype.softBind = function(obj) 
{
	const fn = this;
	return function(...args) 
    {
		return fn.apply(
			!this || this === globalThis ? obj : this,
			args
		);
	};
};
const soft = sayFood.softBind(foodLover);
soft();              // Favorite: Pav Bhaji
soft.call({ food: "Dosa" }); // Favorite: Dosa


// 11. New Binding (`new` keyword)
// `this` refers to the newly created object from constructor calls.
function Product(name, price) 
{
	this.name = name;
	this.price = price;
}
const item = new Product("Phone", 20000);
console.log(item.name); // Phone


//12. Precedence: new > hard bind > explicit > implicit > default
function showBook(title) 
{
	this.title = title;
}
const library = { title: "Original" };
const hard = showBook.bind(library);
const result = new hard("JS Mastery");
console.log(result.title); // JS Mastery


// 13. Arrow Functions Lexical `this`
// Arrow functions capture `this` from the surrounding scope.
const game = 
{
	level: "Easy",
	start() 
    {
		setTimeout(() => 
        {
			console.log("Level:", this.level);
		}, 300);
	}
};
game.start(); // Level: Easy


// 14. Emulating Arrow `this` with `var self = this`
// Old trick for capturing `this` inside nested functions.
const movie = {
	name: "Dhoom",
	
    show() 
    {
		const self = this;
		setTimeout(function() {
			console.log("Movie:", self.name);
		}, 200);
	}
};
movie.show();
