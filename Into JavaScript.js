//Values & typeof operator
// JavaScript has typed values, and typeof helps inspect them.
let v;
console.log(typeof v); // "undefined"

v = "coding";
console.log(typeof v); // "string"

v = 21;
console.log(typeof v); // "number"

v = false;
console.log(typeof v); // "boolean"

v = null;
console.log(typeof v); // "object" (quirky bug)

v = { role: "admin" };
console.log(typeof v); // "object"

//Object properties and access styles
// You can use dot or bracket notation to access properties.
let person = 
{
  name: "Vatsal",
  age: 20,
  active: true
};

console.log(person.name);      // "Vatsal"
console.log(person["age"]);    // 20

let key = "active";
console.log(person[key]);     // true

//Arrays hold values by index
// Arrays are special objects with number-based keys.
let playlist = ["lofi", "pop", "jazz"];
console.log(playlist[0]);     // "lofi"
console.log(playlist.length); // 3

//Functions are first-class values
// Functions can have their own properties like objects.
function greet() 
{
  return "Hey!";
}
greet.lang = "English";
console.log(typeof greet);     // "function"
console.log(greet.lang);       // "English"

//String and number methods (via boxing)
//Even primitive values can use methods due to automatic boxing.
let msg = "welcome";
console.log(msg.toUpperCase()); // "WELCOME"

let pi = 3.14159;
console.log(pi.toFixed(2));     // "3.14"

//Explicit coercion using built-in functions
// We can convert string to number clearly with Number().
let strVal = "100";
let numVal = Number(strVal);
console.log(numVal);           // 100

//Implicit coercion using operations
// Non-number strings are converted automatically in math.
let original = "7";
let multiplied = original * 2;
console.log(multiplied);       // 14

//Truthy and falsy values in conditionals
// Empty string, 0, null, NaN, undefined, false are falsy.
let token = "";
if (!token) 
{
  console.log("Token is empty");
}

//Equality comparisons (== vs ===)
// == allows coercion, === does not
let strNum = "42";
let realNum = 42;
console.log(strNum == realNum);  // true
console.log(strNum === realNum); // false

//Object comparisons compare references, not content
let arr1 = [1, 2];
let arr2 = [1, 2];
console.log(arr1 == arr2);      // false

let same = arr1;
console.log(arr1 === same);     // true

//Relational operators with coercion
// Inequality comparisons can also coerce to numbers
let height = "180";
console.log(height > 170);     // true

//Variable declaration with var and let
// let supports block scope, var does not
function testBlockScope() 
{
  var outside = 1;

  if (outside > 0) 
{
    let inside = 2;
    console.log(outside + inside); // 3
}

  // console.log(inside); // ReferenceError
}
testBlockScope();

//Hoisting moves declarations to top
// var declarations are hoisted, but not their assignments
function demoHoist() 
{
  console.log(value); // undefined
  var value = 10;
}
demoHoist();

//switch case for multiple value checks
let code = 302;
switch (code) 
{
  case 200:
    console.log("OK");
    break;
  case 302:
    console.log("Redirect");
    break;
  default:
    console.log("Unknown");
}

//Ternary operator as a mini if/else
let speed = 55;
let status = speed > 60 ? "Too fast" : "Within limit";
console.log(status); // "Within limit"

//Strict mode for cleaner code behavior
"use strict";
function enforceClean() 
{
  // not defining variable would throw ReferenceError
  // undeclaredVar = 100;
  let cleanVar = 100;

  console.log(cleanVar);
}
enforceClean();

//Functions as values
// Functions can be assigned, passed, and returned like values.
let run = function() 
{
  return "Executing";
};
console.log(run()); // "Executing"

//IIFE (Immediately Invoked Function Expression)
// Helps create local scope instantly
(function () 
{
  let secret = "hidden";
  console.log("IIFE ran");
})();

//Closures remember outer scope
function makeCounter(start) 
{
  return function step() 
  {
    return start++;
  };
}
let count = makeCounter(10);
console.log(count()); // 10
console.log(count()); // 11

//Module pattern using closures
function User() 
{
  let username;

  function login(name) 
  {
    username = name;
    console.log("Welcome, " + username);
  }

  return 
  {
    login
  };
}



//this behavior depends on call style
function whoAmI() 
{
  console.log(this.label);
}
let obj = 
{
  label: "Object Label",
  who: whoAmI
};
let label = "Global Label";

whoAmI();           // undefined or "Global Label"
obj.who();          // "Object Label"
whoAmI.call({ label: "Custom" }); // "Custom"

//Prototypes enable object delegation
let base = { skill: "JavaScript" };
let dev = Object.create(base);
dev.experience = 2;

console.log(dev.experience); // 2
console.log(dev.skill);      // "JavaScript" (from prototype)

//Polyfill: adding missing behavior
if (!Number.isEven) 
{
  Number.isEven = function(n) 
  {
    return n % 2 === 0;
  };
}
console.log(Number.isEven(6)); // true

//Transpilation: write modern, serve old
// Example default parameter (modern)
function greetUser(name = "guest") 
{
  console.log("Hello, " + name);
}
greetUser();         // Hello, guest
greetUser("Harsh");   // Hello, Harsh

// DOM API is host-provided, not core JS
// var element = document.getElementById("btn"); // Browser-only

// Console I/O is host-provided too
console.log("Logging something...");
