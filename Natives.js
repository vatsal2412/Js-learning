//Built-in Native Constructors
// All primitives have wrapper constructors: String, Number, Boolean, etc.
let title = new String("LearnJS");
console.log(title.toString());        // "LearnJS"

//Wrapping creates objects — not raw primitives
// typeof returns "object", and instanceof confirms the wrapper type
let box = new String("Code");
console.log(typeof box);             // "object"
console.log(box instanceof String);  // true

//Using Object.prototype.toString to reveal internal [[Class]]
// This lets us distinguish actual type more precisely for objects
console.log(Object.prototype.toString.call([1, 2, 3]));      // [object Array]
console.log(Object.prototype.toString.call(/test/i));        // [object RegExp]

//For null and undefined, toString still works with correct class
// Even though they're primitives, we still get consistent internal [[Class]]
console.log(Object.prototype.toString.call(null));           // [object Null]
console.log(Object.prototype.toString.call(undefined));      // [object Undefined]

//Other primitive types are auto-boxed for property access
// You can use .length and .toUpperCase() on strings because JS wraps them
let greeting = "hello";
console.log(greeting.length);        // 5
console.log(greeting.toUpperCase()); // "HELLO"

//Never use object wrappers directly (like new String, new Number)
// Browsers optimize primitives better — wrappers actually make performance worse
let badBool = new Boolean(false);
if (!badBool) {
  console.log("This will never print"); // This won't run — badBool is truthy!
}

//If you must wrap, prefer Object() for boxing
// Object() is a safer, more general-purpose wrapper for boxing
let plain = "data";
let wrap1 = new String(plain);
let wrap2 = Object(plain);
console.log(typeof wrap1, typeof wrap2);  // object object
console.log(wrap2 instanceof String);     // true

//Use .valueOf() to unbox primitive from wrapper
// This lets you extract the raw value stored in a wrapper
let wrappedStr = new String("Zen");
let wrappedNum = new Number(2024);
console.log(wrappedStr.valueOf());  // "Zen"
console.log(wrappedNum.valueOf());  // 2024

//Unboxing can happen implicitly too
// Using a wrapped object in a string context auto-unboxes it
let wrapped = new String("dev");
let unboxed = wrapped + "ops";
console.log(typeof wrapped, typeof unboxed); // object string

//Arrays: literal vs constructor form
// Prefer literals for safety and readability
let a = new Array(1, 2, 3);
let b = [1, 2, 3];
console.log(a, b);                 // [1,2,3] [1,2,3]

//Avoid sparse arrays created with Array(number)
// It sets the length but doesn't fill values — behaves inconsistently
let sparse = new Array(4);        // 4 empty slots
console.log(sparse.length);       // 4
console.log(sparse.map(x => 1));  // [] — skipped during map

//Use Array.apply or Array.from to create filled arrays
// This creates real undefined-filled arrays with working slots
let filled = Array.apply(null, { length: 4 });
console.log(filled);              // [undefined, undefined, undefined, undefined]

//Use object literal instead of Object constructor
let obj1 = new Object();
obj1.role = "reader";

let obj2 = { role: "writer" };
console.log(obj1, obj2);          // Both valid, prefer obj2

//Function constructor is rare; better to use normal function
let f1 = new Function("x", "return x + 5;");
console.log(f1(3));               // 8

let f2 = function(x) { return x + 5; };
console.log(f2(3));               // 8

//RegExp constructor useful when pattern is dynamic
let word = "cloud";
let regex = new RegExp(`\\b${word}\\b`, "gi");
let text = "The cloud is vast. Cloud computing is growing.";
console.log(text.match(regex));   // ["cloud", "Cloud"]

//Date and Error must be constructed
let now = new Date();
console.log(now.toISOString());   // 2024-xx-xxTxx:xx:xx.xxxZ

function throwIfMissing(x) 
{
  if (!x) throw new Error("Value required");
}
try {
  throwIfMissing();              // Will throw
} catch (e) {
  console.log(e.message);        // "Value required"
}

//Symbol: unique primitive for property keys
let token = Symbol("session");
let user = {};
user[token] = "abc123";
console.log(user[token]);        // abc123

console.log(typeof token);       // symbol
console.log(token.toString());   // Symbol(session)

//Native prototype methods work via delegation
let msg = " Coding ";
console.log(msg.indexOf("d"));   // 2
console.log(msg.trim());         // "Coding"

//Function prototype provides call/apply/bind
function say(msg) {
  console.log(msg);
}
say.call(null, "Hello!");        // Hello!

//Some prototypes are valid default fallbacks
function processInput(arr, fn, reg) {
  arr = arr || Array.prototype;
  fn = fn || Function.prototype;
  reg = reg || RegExp.prototype;

  return reg.test(arr.map(fn).join(""));
}
console.log(processInput());     // true (default regex matches empty string)
