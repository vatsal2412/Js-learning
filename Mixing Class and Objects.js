//  1. Basic "Class" Setup Using Constructor Functions
// Functions can act like classes by returning new objects using `new`.
function Animal(type) 
{
	this.type = type;
}
Animal.prototype.speak = function() 
{
	console.log(`The ${this.type} makes a sound.`);
};
const dog = new Animal("dog");
dog.speak(); // The dog makes a sound.


// 2. Inheritance via Constructor Call and `Object.create`
// Simulates class inheritance by chaining prototypes and calling parent constructor.
function Mammal(name) 
{
	Animal.call(this, "mammal");
	this.name = name;
}
Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.identify = function() 
{
	console.log(`This mammal is ${this.name}`);
};
const cat = new Mammal("Whiskers");
cat.speak();      // The mammal makes a sound.
cat.identify();   // This mammal is Whiskers


// 3. Polymorphism via Method Overriding
// Child can override parent methods but still call parent with `.call(this)`.
Mammal.prototype.speak = function() 
{
	Animal.prototype.speak.call(this);
	console.log(`${this.name} meows.`);
};
cat.speak(); // The mammal makes a sound. Whiskers meows.


// 4. Explicit Mixins for Copying Behavior
// Mix properties from one object to another manually (like inheritance by copy).
function mixin(source, target) 
{
	for (let key in source)
        {
		    if (!(key in target)) 
                {
			        target[key] = source[key];
	        	}
        }
	return target;
}
const canFly = 
{
    takeOff() 
    {
		console.log(`${this.name} is flying!`);
	}
};

const bird = { name: "Parrot" };
mixin(canFly, bird);
bird.takeOff(); // Parrot is flying!


// 5. Function References Shared Between Mixed-In Objects
// Shared methods are references, not copies—changes affect all mixed-in objects.
canFly.takeOff = function() 
{
	console.log(`${this.name} flaps wings and soars!`);
};
bird.takeOff(); // Parrot flaps wings and soars!


// 6. Parasitic Inheritance: Creating and Extending in One Step
// Build a child object by creating and modifying a parent instance inline.
function Robot(model) 
{
	this.model = model;
}
Robot.prototype.reboot = function() 
{
	console.log(`${this.model} is rebooting...`);
};

function Android(model) 
{
	let bot = new Robot(model);
	bot.language = "JavaScript";
	const parentReboot = bot.reboot;
	bot.reboot = function() 
    {
		parentReboot.call(this);
		console.log(`${this.model} speaks ${this.language}`);
	};
	return bot;
}

const x21 = new Android("X-21");
x21.reboot();
// X-21 is rebooting...
// X-21 speaks JavaScript


//7. Implicit Mixins: Borrowing Behavior Dynamically
// A method from one object is called in the context of another using `call`.
const Logger = {
	logInfo() {
		this.log = `INFO: Operation by ${this.user}`;
	}
};

const session = {
	user: "Anita",
	printLog() {
		Logger.logInfo.call(this);
		console.log(this.log);
	}
};
session.printLog(); // INFO: Operation by Anita


//8. Class Copy vs Link Reminder
// In JavaScript, objects don’t get duplicated—references are linked instead.
const A = { info: "Original" };
const B = Object.assign({}, A);
A.info = "Changed";
console.log(B.info); // Original (because primitive value was copied)

const sharedFunc = { sayHi() { console.log("Hello!"); } };
const user1 = mixin(sharedFunc, {});
const user2 = mixin(sharedFunc, {});
user1.sayHi = function() { console.log("Hi from user1"); };
user2.sayHi(); // Hi from user1 — shared reference got modified


// 9. Avoiding Class Confusion: JS is Not a Class Language
// JavaScript fakes classes but really works through delegation and prototypes.
function Gadget(name) {
	this.name = name;
}
Gadget.prototype.boot = function() {
	console.log(`${this.name} is booting up!`);
};

const tablet = new Gadget("iTab");
tablet.boot(); // iTab is booting up!

// But remember, this is just delegation, not real "class" copying.
console.log(Object.getPrototypeOf(tablet) === Gadget.prototype); // true
