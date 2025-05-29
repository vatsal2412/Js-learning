// 1. Creating an object and checking a direct property
// This object has a single property 'score' directly on it.
const student = 
{
  score: 85
};
console.log(student.score); // 85


// 2. Linking objects using Object.create
// 'newStudent' delegates to 'student' for any missing properties.
const newStudent = Object.create(student);
console.log(newStudent.score); // 85 (delegated from student)


//3. Traversing prototype chain with `for...in` and `in`
for (let key in newStudent) 
{
  console.log("Inherited or own:", key); // score
}
console.log("score" in newStudent); // true


//4. Top of the chain is Object.prototype
// All plain objects eventually link up to Object.prototype.
console.log(Object.getPrototypeOf(student) === Object.prototype); // true


//5. Shadowing a property from prototype
// Creates a new 'score' property on newStudent, hiding parent's version.
newStudent.score = 95;
console.log(newStudent.score); // 95 (own)
console.log(student.score);    // 85 (untouched)


//6. Shadowing doesn't affect prototype chain
// Property shadowing isolates changes to the lower object only.
console.log(newStudent.hasOwnProperty("score")); // true
console.log(student.hasOwnProperty("score"));    // true


//7. Implicit shadowing with increment
// Reads from prototype, then writes a new property on the child.
const base = { level: 1 };
const child = Object.create(base);
child.level++; // creates child.level (shadow), base.level untouched
console.log(child.level); // 2
console.log(base.level);  // 1


//8. Constructor functions and prototype linkage
// `Employee` acts like a class, and links instances to its prototype.
function Employee(name) 
{
  this.name = name;
}
Employee.prototype.greet = function() 
{
  console.log(`Hello, my name is ${this.name}`);
};
const emp1 = new Employee("Vatsak");
emp1.greet(); // Hello, my name is Vatsal


//9. Checking prototype relationships
console.log(Object.getPrototypeOf(emp1) === Employee.prototype); // true
console.log(emp1.constructor === Employee); // true


//10. Replacing prototype removes constructor link
// Manually resetting .prototype breaks constructor reference.
function Product() {}
Product.prototype = { type: "gadget" };
const item = new Product();
console.log(item.constructor === Product); // false


//11. Fixing constructor manually using defineProperty
Object.defineProperty(Product.prototype, "constructor", 
{
  value: Product,
  writable: true,
  configurable: true,
  enumerable: false
});
console.log(item.constructor === Product); // true


//12. Inheritance with Object.create
// Setup prototype chain: Manager -> Employee
function Manager(title) 
{
  this.title = title;
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;
Manager.prototype.report = function() 
{
  console.log(`${this.title} reporting in`);
};
const boss = new Manager("Project Lead");
boss.name = "Vikas";
boss.greet();  // Hello, my name is Vikas
boss.report(); // Project Lead reporting in


//13. Avoiding class confusion: objects are linked, not copied
// JS doesn’t clone objects; it links them for property lookups.
const parent = { job: "Engineer" };
const childObj = Object.create(parent);
console.log(childObj.job); // Engineer


//14. Custom utility to simulate Object.create (pre-ES5)
function createLinkedObject(proto) 
{
  function Temp() {}
  Temp.prototype = proto;
  return new Temp();
}
const baseObj = { mood: "happy" };
const derivedObj = createLinkedObject(baseObj);
console.log(derivedObj.mood); // happy


//15. Polyfill-safe `Object.create()` fallback
if (!Object.create) 
{
  Object.create = createLinkedObject;
}


//16. .isPrototypeOf and instanceof checks
// Used to check if one object exists in another’s prototype chain.
console.log(Employee.prototype.isPrototypeOf(emp1)); // true
console.log(emp1 instanceof Employee);               // true


//17. __proto__ access (non-standard, now legacy)
// proto__ allows manual inspection of the prototype chain.
console.log(emp1.__proto__ === Employee.prototype); // true


//18. Object.create with property descriptors
// Defines properties on the new object with control over flags.
const carBase = { wheels: 4 };
const myCar = Object.create(carBase, 
{
  model: 
  {
    value: "SUV",
    writable: false,
    enumerable: true
  }
});
console.log(myCar.model);  // SUV
console.log(myCar.wheels); // 4


//19. Delegation for clean API (not fallback magic)
// Design APIs with delegation as implementation, not surprise behavior.
const robotCore = {
  speak() {
    console.log("Beep boop!");
  }
};
const robotUnit = Object.create(robotCore);
robotUnit.greet = function() 
{
  this.speak(); // internally delegates to prototype
};
robotUnit.greet(); // Beep boop!
