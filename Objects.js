//1. Creating objects with literal and constructed forms
// Object literals are clean and concise; constructor form is verbose but equivalent.
const car1 = { brand: "Tesla", model: "S" };
const car2 = new Object();
car2.brand = "BMW";
car2.model = "i8";

console.log(car1.brand, car2.model); // Tesla i8

// 2. Objects are not the same as primitives
// `typeof null` is "object" due to a long-standing bug, but null isn't truly an object.
console.log(typeof null); // "object"
console.log(null instanceof Object); // false

//3. Built-in object wrappers behave like objects, not primitives
// Wrapping a string makes it an object with extra features like methods.
const raw = "hello";
const wrapped = new String("hello");
console.log(typeof raw, typeof wrapped); // string object
console.log(wrapped.toUpperCase()); // HELLO

// 4. Property access with dot and bracket notation
// Dot for fixed property names, bracket for dynamic or special characters.
const student = { name: "Anil", "fav-subject": "Math" };
console.log(student.name);         // Anil
console.log(student["fav-subject"]); // Math

//5. Computed property names (ES6)
// Dynamic property names let you programmatically assign keys.
const prefix = "score_";
const results = 
{
  [prefix + "math"]: 98,
  [prefix + "science"]: 92
};
console.log(results.score_math); // 98

//6. Property keys are always strings
// Non-string keys get coerced to strings (like object keys or booleans).
const obj = {};
obj[true] = "yes";
obj[42] = "answer";
console.log(obj["true"], obj["42"]); // yes answer

//7. Arrays are objects with numeric keys
// Arrays behave like objects but are optimized for numeric keys.
const fruits = ["apple", "banana"];
fruits["color"] = "yellow";
console.log(fruits.length); // 2 — numeric keys only count
console.log(fruits.color);  // yellow

// 8. Object.assign for shallow copying
// Easily clone an object (but nested objects remain shared).
const original = { a: 1, b: { deep: true } };
const clone = Object.assign({}, original);
console.log(clone.b === original.b); // true

//9. Property Descriptors: writable, configurable, enumerable
// These control how object properties behave behind the scenes.
const book = {};
Object.defineProperty(book, "title", 
{
  value: "JS Mastery",
  writable: false,
  configurable: false,
  enumerable: true
});
console.log(book.title); // JS Mastery
book.title = "New Title"; // ignored silently
console.log(book.title); // JS Mastery

//10. Making objects immutable (freeze, seal, preventExtensions)
// Prevent adding/modifying properties using built-in immutability methods.
const config = { mode: "dark" };
Object.freeze(config);
config.mode = "light"; // ignored
console.log(config.mode); // dark

//11. Getter and setter methods
// Getters and setters control access to properties like computed fields.
const person = 
{
  firstName: "Vatsal",
  lastName: "Shah",
  get fullName() 
  {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) 
  {
    [this.firstName, this.lastName] = name.split(" ");
  }
};
person.fullName = "Vatsal Shah";
console.log(person.fullName); // Vatsal Shah

//12. Checking if properties exist
// `in` checks all properties including the prototype chain; `hasOwnProperty` checks only direct ones.
const user = { age: 20 };
console.log("age" in user); // true
console.log(user.hasOwnProperty("age")); // true

// 13. Enumerability of properties
// Non-enumerable properties are hidden from loops like `for...in`.
const account = {};
Object.defineProperty(account, "balance", 
{
  value: 1000,
  enumerable: false
});
console.log("balance" in account); // true
for (let key in account) 
{
  console.log(key); // won't print 'balance'
}

//14. Iterating with for...of using custom iterator
// Objects can define custom iteration behavior using [Symbol.iterator].
const team = 
{
  lead: "Harsh",
  dev: "Sameer",
  [Symbol.iterator]: function () {
    const values = Object.values(this);
    let i = 0;
    return {
      next() {
        return { value: values[i++], done: i > values.length };
      }
    };
  }
};
for (const member of team) {
  console.log(member); // Harsh,sameer
}

//15. Infinite custom iterator example (safe usage)
// Creates unlimited values; use a break to control iterations.
const ids = {
  current: 0,
  [Symbol.iterator]() {
    return {
      next: () => ({ value: this.current++, done: false })
    };
  }
};
const result = [];
for (let id of ids) {
  if (id > 3) break;
  result.push(id);
}
console.log(result); // [0, 1, 2, 3]
