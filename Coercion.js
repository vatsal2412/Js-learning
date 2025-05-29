// Coercion with Strings and Numbers
// When a number is added to a string, the number is coerced to a string automatically.
let score = 30;
let label = score + " points";
console.log(label); // "30 points"


// Implicit vs. Explicit Coercion
// You can use +"" to implicitly convert to string, or String() for explicit conversion.
let productId = 501;
let tag1 = productId + "";
let tag2 = String(productId);
console.log(tag1, tag2); // "501" "501"


// Object to String Coercion
// Arrays turn into strings when used with + because they have a default toString().
let codes = [100, 200];
let result = codes + " status";
console.log(result); // "100,200 status"


// Coercing with ValueOf and ToString
// JS tries valueOf() first, then toString(), when coercing objects.
let account = {
  valueOf() { return 5000; },
  toString() { return "No Value"; }
};
console.log(account + ""); // "5000"
console.log(String(account)); // "No Value"


// Coercing String to Number
// Subtraction or multiplication can coerce strings into numbers implicitly.
let strAmount = "75.5";
let amount = strAmount - 0;
console.log(amount); // 75.5


// Boolean Coercion
// Non-empty strings, numbers (except 0/NaN), and objects are truthy in JS.
let name = "Zara";
if (name) {
  console.log("Name is defined");
}


// Loose Equality Coercion
// == allows coercion between types, while === does not.
let num = 100;
let str = "100";
console.log(num == str);  // true
console.log(num === str); // false


// Weird Coercion with Arrays and Objects
// Arrays and objects can lead to unexpected coercion results.
let a = [] + {}; // "[object Object]"
let b = {} + []; // 0 in console, depends on context
console.log(a, b);


// Boolean to Number
// JS coerces true to 1 and false to 0 in numeric operations.
let likes = true + 2;
console.log(likes); // 3


// Coercing Falsy Values
// Values like "", 0, null, undefined, false, NaN are all falsy.
let email = "";
if (!email) {
  console.log("Email is missing");
}


// Logical OR (||) Coercion
// || returns the first truthy value it finds — useful for fallbacks.
let city = "" || "Mumbai";
console.log(city); // "Mumbai"


// Logical AND (&&) Coercion
// && returns the first falsy value or the last truthy one — good for guarding.
let active = true && "Welcome!";
console.log(active); // "Welcome!"


// Coercing in Comparison
// Comparisons like > or < also trigger type coercion if needed.
let x = "7";
let y = 5;
console.log(x > y); // true (because "7" becomes 7)


// Using !! for Boolean Coercion
// !! is a quick way to convert any value to its boolean equivalent.
let loggedIn = !!"user";
console.log(loggedIn); // true


// Confusing Coercion Gotcha
// The order of operations and coercion can be tricky without parentheses.
let res = [] + 5 + 1;
console.log(res); // "51" (Array becomes "", then "5" + 1 = "51")
