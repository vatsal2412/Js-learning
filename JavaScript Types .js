//Primitive Types: The 7 built-in data types in JavaScript
// These are the core building blocks of all JS values
let nothing = null;                  // intentional absence of value
let missing;                         // undefined by default
let isActive = true;                 // boolean
let count = 42;                      // number
let name = "Aanya";                  // string
let data = { key: "value" };         // object
let uniqueKey = Symbol("id");        // symbol (ES6+)

//typeof operator returns type info as string
// Use it to check what kind of value a variable holds
console.log(typeof nothing);         // "object" (quirk!)
console.log(typeof missing);         // "undefined"
console.log(typeof count);           // "number"
console.log(typeof name);            // "string"
console.log(typeof data);            // "object"
console.log(typeof uniqueKey);       // "symbol"

//Special case: typeof null returns "object"
// This is a legacy bug from early JS versions
console.log(typeof null);            // "object" — but it's a primitive!

//Compound null check using typeof + falsy
// This is how to reliably check for null in type-safe ways
let emptyValue = null;
console.log(!emptyValue && typeof emptyValue === "object"); // true

//typeof returns "function" for callable objects
// Functions are a special object subtype in JS
function greet(who) 
{
	console.log(`Hello, ${who}`);
}
console.log(typeof greet);           // "function"
console.log(greet.length);           // 1 (number of parameters)

// Arrays are objects too, not a separate type
// Arrays have index-based access and length property
let colors = ["red", "green", "blue"];
console.log(typeof colors);          // "object"
console.log(Array.isArray(colors));  // true

//Variables don’t have types — values do
// A variable can hold any type over time
let item = 100;                      // starts as number
item = "text";                       // becomes string
console.log(typeof item);           // "string"

//typeof always returns a string
// typeof typeof returns "string", because typeof returns a string
console.log(typeof typeof 42);       // "string"

//undefined vs undeclared — very different concepts
// Undefined means the variable exists but has no value
let version;
console.log(typeof version);         // "undefined"

// Undeclared means the variable doesn't exist at all
// console.log(notDeclared);         // ReferenceError
console.log(typeof notDeclared);     // "undefined" (no error with typeof)

//typeof used as safe guard before using a global flag
// Useful for checking feature flags or environment variables
if (typeof DEBUG !== "undefined") {
	console.log("Debugging mode is on.");
}

//window property access avoids ReferenceError
// You can check global flags safely via window object (browser only)
if (typeof window !== "undefined" && window.DEBUG) {
	console.log("Using window.DEBUG safely");
}

//typeof works for feature detection too
// Common in polyfill logic to avoid overwriting built-in features
if (typeof atob === "undefined") 
    {
	atob = function () 
    {
		console.log("Custom atob fallback called");
	};
}

//typeof also helps avoid errors inside utility functions
// Example: fallback to internal implementation if not defined outside
function renderChart() 
{
	const engine =
		(typeof ChartEngine !== "undefined")
		? ChartEngine
		: function () { console.log("Default engine used."); };

	engine(); // call the chosen engine
}

// Simulate local override
(function () 
{
	function ChartEngine() 
    {
		console.log("Custom chart engine");
	}
	renderChart(); // uses local ChartEngine
})();

//Dependency injection avoids typeof checks
// A cleaner alternative is to pass in what you need
function renderCustomChart(engine) 
{
	const useEngine = engine || function () { console.log("Default used."); };
	useEngine();
}
renderCustomChart(); // Default used
renderCustomChart(() => console.log("Injected custom renderer")); // Custom
