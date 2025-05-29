//1. Reusable Functions with `this` Context
// You can reuse a single function on multiple objects using `this`.
function getName() 
{
	return this.name.toUpperCase();
}
function sayHello() 
{
	console.log("Hi, I'm " + getName.call(this));
}
const personA = { name: "Diya" };
const personB = { name: "Rahul" };
sayHello.call(personA); // Hi, I'm DIYA
sayHello.call(personB); // Hi, I'm RAHUL

//2. Without `this`, you'd have to pass context manually
// Using parameters instead of `this` makes code more verbose.
function getNameExplicit(obj) 
{
	return obj.name.toUpperCase();
}
function sayHelloExplicit(obj) 
{
	console.log("Hi, I'm " + getNameExplicit(obj));
}
sayHelloExplicit(personA); // Hi, I'm DIYA

//3. Common Misunderstanding: `this` ≠ the function itself
// `this` inside the function doesn’t refer to the function itself.
function logCount(num) 
{
	console.log("Logging:", num);
	this.count++;
}
logCount.count = 0;
for (let i = 0; i < 3; i++) logCount(i); 
console.log("Count?", logCount.count); // Count? 0

//4. Correcting the above: Use a separate data holder
// Instead of relying on `this`, store data in a known object.
const counter = { count: 0 };
function logSafely(num) 
{
	console.log("Logged:", num);
	counter.count++;
}
for (let i = 0; i < 3; i++) logSafely(i);
console.log("Counter:", counter.count); // 3

// 5. Lexical Reference Instead of `this`
// You can use the function’s name to refer to itself.
function repeatSelf() 
{
	repeatSelf.count = (repeatSelf.count || 0) + 1;
	console.log("Repeat count:", repeatSelf.count);
}
for (let i = 0; i < 2; i++) repeatSelf(); // 1, 2

// 6. Using `call` to explicitly bind `this`
// You can bind `this` to an object of your choice.
function bindMe(num) 
{
	console.log("Bind:", num);
	this.count++;
}
bindMe.count = 0;
for (let i = 0; i < 2; i++) 
{
	bindMe.call(bindMe, i);
}
console.log("Call-bound count:", bindMe.count); // 2

// 7. `this` does not access lexical scope
// `this` can't reach into another function's variable scope.
function outer() 
{
	let secret = 42;
	this.reveal(); // `this` doesn't see `secret`
}
function reveal() 
{
	console.log("Secret is:", this.secret); // undefined
}
const context = { secret: "hidden", reveal };
outer.call(context); // Secret is: hidden

// 8. Anonymous vs Named Function Reference
// Anonymous functions can't refer to themselves unless captured.
const shout = function shoutAgain() 
{
	console.log("Yelling!");
};
shout(); // works fine

setTimeout(function delayed() 
{
	console.log("Timeout triggered!");
}, 1000); // ✅ named and debuggable

// 9. Best Practice: Prefer named functions over anonymous
// Names help with debugging and self-reference when needed.
setTimeout(function sayLater() 
{
	console.log("Executed later with clarity!");
}, 500);
