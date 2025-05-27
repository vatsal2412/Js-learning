// Syntax - let, const, arrow functions, spread/rest
// `let` and `const` bring true block scoping to variables in JavaScript.
{
	let count = 3;
	const msg = "Block scoped!";
	console.log(count, msg);
}

// Arrow functions make short functions more concise and bind `this` lexically.
const greet = name => `Hello, ${name}!`;
console.log(greet("Vatsal"));

// Spread allows arrays to expand in function calls; rest collects into arrays.
function sum(...nums) 
{
	return nums.reduce((a, b) => a + b);
}
console.log(sum(...[1, 2, 3]));


//  Organization - Iterators, generators, classes
// Iterators let us define custom step-by-step access to data.
const iterable = 
{
	[Symbol.iterator]() 
    {
		let i = 0;
		return 
        {
			next() 
                {
				    return i < 3 ? { value: i++, done: false } : { done: true };
			    }
		};
	}
};
for (const val of iterable) console.log("Iterator:", val);

// Generators pause and resume execution with `yield`, simplifying async flows.
function* idMaker() 
{
	let id = 0;
	while (true) yield id++;
}
const gen = idMaker();
console.log("Generator ID:", gen.next().value);


// Async Flow Control - Promises
// Promises provide a cleaner alternative to nested callbacks for async logic.
function fakeFetch(data, shouldFail = false) 
{
	return new Promise((res, rej) => 
        {
		    setTimeout(() => shouldFail ? rej("Error") : res(data), 300);
	    });
}
fakeFetch(" Data").then(console.log).catch(console.error);


// Collections - Map, Set, WeakMap, WeakSet
// Maps allow keys of any type, not just strings.
const userMap = new Map();
userMap.set({ id: 1 }, "Vatsal");
console.log("Map size:", userMap.size);

// Sets store unique values and remove duplicates automatically.
const tags = new Set(["js", "es6", "js"]);
console.log("Set size:", tags.size);


// API Additions - Array.from, Array.of, Object.assign
// `Array.of()` fixes quirky behavior of `Array()` with single numbers.
console.log(Array.of(5)); // [5]

// `Array.from()` turns array-like objects into real arrays.
console.log(Array.from({ length: 2, 0: "a", 1: "b" }));

// `Object.assign()` copies properties from sources to a target object.
const merged = Object.assign({}, { a: 1 }, { b: 2 });
console.log("Merged object:", merged);


//Meta Programming - Proxies, Symbols, Function.name
// Symbols create unique property keys that won't clash accidentally.
const secret = Symbol("secret");
const obj = { [secret]: "hidden" };
console.log("Symbol access:", obj[secret]);

// Proxies let you intercept object operations like reads/writes.
const logged = new Proxy({}, 
    {
	    get(target, prop) 
        {
		    console.log(`Accessed: ${prop}`);
		    return target[prop];
	    }
    });
logged.foo = 123;
console.log(logged.foo);

// Function names can be inferred and are useful in debugging or tracing.
const myFunc = function cool() {};
console.log("Function name:", myFunc.name);


// async/await - Simplified Promises
// `async`/`await` make async code look and behave like synchronous code.
async function asyncDemo() 
{
	try 
    {
		const val = await fakeFetch("async/await");
		console.log(val);
	} 
    catch (e) 
    {
		console.error("Failed:", e);
	}
}
asyncDemo();
