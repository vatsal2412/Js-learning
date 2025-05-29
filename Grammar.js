// Expressions evaluate to a value and can be reused or assigned elsewhere.
let score = 5 * 3; // 15
let points = score;
points; // 15


// Statements can be declarations or expressions standing alone as actions.
let mood = "happy";
let status = mood;  // statement using an expression
status;


// A block's final statement carries the block's value (visible in console).
if (true) {
	var total = 20 + 22;
}
// Console will report 42 when run in dev tools


// Eval can capture block completion values (not recommended for production).
let result = eval("if (true) { var bonus = 30 + 12; }");
console.log(result); // 42



// Expressions with no side effects just compute a result.
let a = 10;
let b = a * 2; // `a * 2` doesn’t affect any other state


// Function calls cause side effects if they modify state.
let balance = 100;
function deduct() {
	balance -= 20;
}
deduct(); // balance now 80


// Postfix increment returns original value then increments the variable.
let likes = 10;
let saved = likes++;
console.log(likes); // 11
console.log(saved); // 10


// Prefix increment increments first, then returns the new value.
let stars = 5;
let newStars = ++stars;
console.log(stars); // 6
console.log(newStars); // 6


// Use comma operator to sequence expressions and get last value.
let counter = 1;
let value = (counter++, counter);
console.log(counter); // 2
console.log(value);   // 2


// Delete removes object properties and returns a boolean result.
let user = { name: "Ali" };
console.log(delete user.name); // true
console.log(user.name); // undefined


// Assignment expressions return the assigned value.
let height;
height = 180;
console.log(height); // 180


// Chained assignments work right-to-left based on operator associativity.
let x, y, z;
x = y = z = 7;
console.log(x, y, z); // 7 7 7


// Assignment inside conditionals can be useful but requires care.
function findVowels(str) {
	let found;
	if (str && (found = str.match(/[aeiou]/g))) {
		return found;
	}
}
console.log(findVowels("Tuesday")); // [ 'u', 'e', 'a' ]


// Labels allow breaking or continuing outer blocks/loops.
outer: for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		if (i === j) continue outer;
		console.log(i, j);
	}
}


// Labels can also break out of non-loop code blocks.
labelBlock: {
	console.log("Start");
	break labelBlock;
	console.log("Skipped");
}
console.log("End");


// Destructuring allows clean extraction from objects or function arguments.
function showUser({ name, age }) {
	console.log(name, age);
}
showUser({ name: "Lina", age: 29 }); // Lina 29


// Operator precedence affects how expressions group and evaluate.
let a1 = true, b1 = false, c1 = "text";
let d = a1 && b1 || c1 ? c1 || b1 ? a1 : c1 && b1 : a1;
console.log(d); // true


// Use parentheses to clarify or enforce specific evaluation order.
let e = (a1 && b1) || (c1 ? (c1 || b1 ? a1 : c1 && b1) : a1);
console.log(e); // true


// Ternary (`? :`) operators associate right-to-left.
let rating = true ? false : true ? true : false;
console.log(rating); // false


// Use `try..finally` to guarantee final actions regardless of errors.
function wrap() {
	try {
		return "Finished";
	} finally {
		console.log("Always runs!");
	}
}
console.log(wrap()); // "Always runs!", then "Finished"


// Return in finally overrides earlier return.
function mystery() {
	try {
		return 10;
	} finally {
		return 20;
	}
}
console.log(mystery()); // 20


// Automatic Semicolon Insertion (ASI) may insert semicolons at line breaks.
function testASI() {
	return
	42;
}
console.log(testASI()); // undefined, not 42


// Use `switch` for clean value branching logic.
let grade = "B";
switch (grade) {
	case "A": console.log("Excellent"); break;
	case "B": console.log("Good"); break;
	default: console.log("Try harder");
}


// `switch` evaluates expressions strictly, use `switch(true)` for flexibility.
let code = "202";
switch (true) {
	case code == "200": console.log("OK"); break;
	case code == "202": console.log("Accepted"); break;
	default: console.log("Unknown");
}


// The comma operator can be used to combine and evaluate multiple values.
let res = (console.log("Processing..."), 99);
console.log(res); // 99


// Function arguments can diverge from `arguments` array in non-strict mode.
function checkParams(a) {
	a = 100;
	console.log(arguments[0]); // reflects updated value
}
checkParams(50); // 100


// But in strict mode, `arguments` no longer mirrors parameter values.
function strictCheck(a) {
	"use strict";
	a = 200;
	console.log(arguments[0]); // remains 50
}
strictCheck(50);


// Be careful using uninitialized block-scoped variables (TDZ error).
{
	// console.log(temp); // ReferenceError
	let temp = 8;
}
