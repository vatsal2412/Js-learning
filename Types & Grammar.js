// Arrays can store any kind of value, including other arrays
// This is how JavaScript supports multi-dimensional arrays
const books = [101, "JavaScript", [true, "nested"]];
console.log(books.length);      // 3
console.log(books[2][1]);       // "nested"

// Arrays don’t need to be pre-sized; they expand as needed
const fruits = [];
fruits[0] = "apple";
fruits[1] = "banana";
fruits[2] = ["grape"];
console.log(fruits.length);     // 3

// Sparse arrays: watch out for empty slots
const colors = [];
colors[0] = "red";
colors[2] = "blue";             // No value at index 1
console.log(colors[1]);         // undefined
console.log(colors.length);     // 3

// Arrays can hold string keys like objects, but they don’t count in length
const ids = [];
ids[0] = "A100";
ids["ref"] = "special";
console.log(ids.length);        // 1
console.log(ids.ref);           // "special"

// Be careful — numeric string keys can inflate array length
const indexKeys = [];
indexKeys["13"] = "overflow";
console.log(indexKeys.length);  // 14

// Convert array-like arguments to a real array using slice
function logArguments() 
{
  const args = Array.prototype.slice.call(arguments);
  args.push("done");
  console.log(args);
}
logArguments("first", "second");  // ["first", "second", "done"]

// ES6+ way to convert array-like to true array using Array.from
function showItems() 
{
  const list = Array.from(arguments);
  console.log(list.join(", "));
}
showItems("x", "y", "z");        // x, y, z

// Strings resemble arrays but are immutable
const name = "Liam";
const chars = ["L", "i", "a", "m"];
name[1] = "X";                  // no effect
chars[1] = "X";                 // works
console.log(name);             // "Liam"
console.log(chars);            // ["L", "X", "a", "m"]

// String methods return new strings instead of modifying
const shout = name.toUpperCase();
console.log(shout);            // "LIAM"

// You can borrow array methods for strings using call
const dashed = Array.prototype.join.call(name, "-");
console.log(dashed);           // "L-i-a-m"

// Map over characters of a string using borrowed method
const dotted = Array.prototype.map.call(name, c => c + ".").join("");
console.log(dotted);           // "L.i.a.m."

// To reverse a string: convert -> reverse -> join
const reversed = name.split("").reverse().join("");
console.log(reversed);         // "maiL"

// Numbers in JS are all floating-point (64-bit IEEE 754)
let price = 99.99;
let qty = 2;
console.log(price * qty);      // 199.98

// You can write numbers with or without leading/trailing 0s
let decimalA = 0.5;
let decimalB = .5;
let exactA = 50.0;
let exactB = 50.;
console.log(decimalA === decimalB);  // true
console.log(exactA === exactB);      // true

// Large/small numbers are printed using exponent notation
const billion = 1e9;
const micro = 1e-6;
console.log(billion);          // 1000000000
console.log(micro);            // 0.000001

// toFixed limits decimal digits (returns string)
const score = 88.756;
console.log(score.toFixed(1)); // "88.8"

// toPrecision controls total digits (also returns string)
console.log(score.toPrecision(4)); // "88.76"

// Dealing with floating point imprecision
console.log(0.1 + 0.2 === 0.3); // false

// Compare using machine epsilon to handle rounding errors
function closeEnough(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
console.log(closeEnough(0.1 + 0.2, 0.3)); // true

// Safe integers range check (ES6+)
console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false

// Integers only: use Number.isInteger
console.log(Number.isInteger(42));     // true
console.log(Number.isInteger(42.5));   // false

// Use bitwise OR to force a number into 32-bit signed integer
const raw = 3.14159;
const forced = raw | 0;
console.log(forced);           // 3

// NaN: invalid number result
const fail = 2 / "apple";
console.log(Number.isNaN(fail)); // true

// Infinity: result of divide by zero or overflow
const inf = 1 / 0;
console.log(inf);              // Infinity

// -0: special case, distinguishable using 1/n trick
function isNegativeZero(n) 
{
  return n === 0 && 1 / n === -Infinity;
}
console.log(isNegativeZero(-0)); // true

// Object.is handles -0 and NaN accurately
console.log(Object.is(NaN, NaN));     // true
console.log(Object.is(-0, -0));       // true
console.log(Object.is(-0, 0));        // false

// Values are copied by type: primitives copy value
let a = 10;
let b = a;
b++;
console.log(a);               // 10
console.log(b);               // 11

// Objects and arrays copy by reference
const config = { mode: "dark" };
const settings = config;
settings.mode = "light";
console.log(config.mode);     // "light"

// Function parameters: reference mutation inside function
function updateList(arr) 
{
  arr.push("new");
}
const list = ["old"];
updateList(list);
console.log(list);           // ["old", "new"]

// You can’t reassign the reference from inside the function
function reassignArray(arr) 
{
  arr = ["a", "b", "c"];
}
const original = ["x"];
reassignArray(original);
console.log(original);        // ["x"]

// To modify original content, use in-place changes
function replaceArrayContents(arr) 
{
  arr.length = 0;
  arr.push("A", "B");
}
replaceArrayContents(original);
console.log(original);        // ["A", "B"]

// For safe copying, clone arrays using slice
const cloned = list.slice();
cloned.push("copied");
console.log(list);           // ["old", "new"]
console.log(cloned);         // ["old", "new", "copied"]

// To pass primitive by reference, wrap in an object
function mutate(wrapper) 
{
  wrapper.value = "updated";
}
const box = { value: "init" };
mutate(box);
console.log(box.value);      // "updated"
