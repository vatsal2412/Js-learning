// This file demonstrates JavaScript concept like  Asynchronous delay vs. synchronous access,Callback usage,Event loop simulation,Race conditions and resolution,
// Run-to-completion model,Gate and latch patterns,Cooperative concurrency,Microtasks (job queue via Promise.resolve())

function fetchUserData(url) 
{
	setTimeout(() =>
         {
		    return { name: "VATSAL" };
	     }, 1000);
}


// We're calling a function to fetch user data from an API
// But we try to log the result immediately, which won’t work because the request is asynchronous
var user = fetchUserData("https://api.example.com/user");
console.log("User (immediate):", user); // Will be undefined



// Here we properly handle asynchronous data using a callback function
// The data will only be logged once it’s received from the API
function fetchUserDataWithCallback(url, callback) 
    {
	    setTimeout(() => 
            {
		        callback({ name: "VATSAL" });
	        }, 1000);
    }
fetchUserDataWithCallback("https://api.example.com/user", function(user) 
    {
	    console.log("User (callback):", user);
    } );



// This defines a value immediately, and a function to modify it later
// `setTimeout` simulates a delay, so we see the "later" behavior in action
function now() 
    {
	    return 15;
    }
function later() 
    {
	    value += 5;
	    console.log("Final value:", value);
    }
var value = now();
setTimeout(later, 1500);



// We create an object and log it to the console
// However, we update it right after — and some environments might display the updated version instead of a snapshot
var config = { mode: "dark" };
console.log("Config before change:", config);
config.mode = "light";




// This is a simple model of JavaScript’s event loop mechanism
// It checks a task queue and executes tasks one-by-one in a loop, catching any errors
var taskQueue = [];
function simulateEventLoop() 
{
	while (taskQueue.length > 0) 
        {
		   var task = taskQueue.shift();
		     try  
                {
			      task();
		        } 
             catch (e) 
                       {
			             console.error("Task error:", e);
		               }
	    }
}
taskQueue.push(() => console.log("Event 1"));
taskQueue.push(() => console.log("Event 2"));
simulateEventLoop();




// Two different async operations try to update the same value
// Since we don’t control their order, the final result will depend on which completes last
var counter = 100;
function increment()
 {  
     counter += 1; 
 }
function double() 
 { 
    counter *= 2; 
 }
setTimeout(increment, 100);
setTimeout(double, 100);





// These two functions update shared variables, but each one finishes before the other starts
// Thanks to JS’s single-threaded nature, we only have two possible outcomes based on execution order
var a = 2;
var b = 3;
function runOne() 
    {
	    a += 1;
	    b = a * b;
    }
function runTwo() 
    {
	    b -= 1;
	    a = a + b;
    }
setTimeout(runOne, 200);
setTimeout(runTwo, 200);



// We have a shared object that’s updated by two functions
// Since the updates don’t interfere with each other, the execution order doesn’t matter
var result = {};
function setName(data) 
    { 
        result.name = data;
    }
function setAge(data) 
    {
         result.age = data; 
    }
setTimeout(() => setName("VATSAL"), 300);
setTimeout(() => setAge(25), 300);


// Both responses push data into the same array without coordination
// This can result in a race condition where the order of items isn’t what we expect
var responses = [];
function collectResponse(data) 
    {
	    responses.push(data);
    }
setTimeout(() => collectResponse("first"), 400);
setTimeout(() => collectResponse("second"), 400);



// We fix the race condition by using a unique ID in each response
// This lets us place the data in a specific index regardless of response order
var orderedResponses = [];
function collectOrdered(data) 
    {
	    if (data.id === 1) orderedResponses[0] = data.value;
	    else if (data.id === 2) orderedResponses[1] = data.value;
    }
setTimeout(() => collectOrdered({ id: 2, value: "B" }), 500);
setTimeout(() => collectOrdered({ id: 1, value: "A" }), 500);



// This setup waits until both async values are available before moving forward
// It uses a basic "gate" pattern to prevent premature execution/
var one, two;
function stepOne(val) 
    {
	    one = val;
	    if (one !== undefined && two !== undefined) printSum();
    }
function stepTwo(val) 
    {
	    two = val;
	    if (one !== undefined && two !== undefined) printSum();
    }
function printSum() 
    {
	    console.log("Sum:", one + two);
    }
setTimeout(() => stepOne(10), 600);
setTimeout(() => stepTwo(20), 600);



// This pattern ensures that only the first result wins, and later ones are ignored
// Useful when you only want the quickest response to be used
var firstResult;
function setFirst(val) 
  {
	if (firstResult === undefined)
         {
		    firstResult = val;
		    console.log("First wins:", firstResult);
	     }
  }
setTimeout(() => setFirst("alpha"), 700);
setTimeout(() => setFirst("beta"), 700);



// This code processes a huge dataset in small chunks using recursion and setTimeout
// This keeps the browser responsive and avoids freezing the UI

var dataSet = Array.from({ length: 5000 }, (_, i) => i);
var results = [];

function processInChunks(data) 
 {
	var chunk = data.splice(0, 1000);
	results = results.concat(chunk.map(n => n * 2));
	if (data.length > 0) 
        {
		    setTimeout(() => processInChunks(data), 0);
	    }
 }
processInChunks([...dataSet]);



// A theoretical example showing how the job queue might behave
// Jobs execute right after the current event loop tick, before timers like setTimeout
console.log("Start");

setTimeout(() => 
     {
	   console.log("Timer finished");
     }, 0);

Promise.resolve().then(() => 
    {
	    console.log("Microtask 1");

	    Promise.resolve().then(() => 
            {
		        console.log("Microtask 2");
	        });
    });
