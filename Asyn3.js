// 1. Promises represent future values—like waiting for your coffee order to be ready.
// The order number is the promise, and the coffee is the eventual resolution.
function orderCoffee() 
{
    return new Promise(function (resolve, reject) 
    {
        setTimeout(() => resolve("Latte ready!"), 1000);
    });
}
orderCoffee().then(coffee => console.log(coffee));

// 2. A Promise lets you reason about "future values" like they're already here.
// It replaces fragile callback code with a clear, trustable async flow.
function fetchX() 
{
    return new Promise(resolve => setTimeout(() => resolve(3), 300));
}
function fetchY() 
{
    return new Promise(resolve => setTimeout(() => resolve(7), 500));
}
function add(xPromise, yPromise) 
{
    return Promise.all([xPromise, yPromise])
        .then(values => values[0] + values[1]);
}
add(fetchX(), fetchY()).then(sum => console.log("Sum is:", sum));



// 3. Promises support both success and failure flows.
// This prevents callback hell and restores error handling to predictable patterns.
function maybeGetData(shouldFail) 
{
    return new Promise((resolve, reject) => 
        {
            setTimeout(() => 
                {
                    shouldFail ? reject("Network error") : resolve("Data loaded");
                }, 300);
        });
}
maybeGetData(false).then(
    data => console.log(data),
    error => console.error("Failed:", error)
);



// 4. Promises can act like events: they signal when something is done or failed.
// This enables powerful decoupling—multiple consumers can react to the same resolution.
function completeTask() 
{
    return new Promise(resolve => 
        {
        setTimeout(() => resolve("Task done!"), 500);
        });
}
const task = completeTask();
task.then(msg => console.log("Handler 1:", msg));
task.then(msg => console.log("Handler 2:", msg));


// 5. Use Promise.resolve() to normalize values or wrap untrusted thenables.
// It guarantees a trusted promise regardless of what's passed in.
let maybePromise = 
{
    then(cb) 
    {
        cb("Surprise!");
    }
};
Promise.resolve(maybePromise).then(msg => console.log("Safe result:", msg));



// 6. Chaining lets you build step-by-step async flows like an assembly line.
// Each .then returns a new promise, keeping your sequence clean and readable.
Promise.resolve(10)
    .then(value => 
        {
            console.log("Step 1:", value);
            return value * 2;
        })
    .then(value =>  
        {
            console.log("Step 2:", value);
            return value - 5;
        })
    .then(value => console.log("Step 3:", value));  // Final: 15



// 7. You can chain promises across async steps for things like API calls.
// Each step waits for the previous to finish, building readable async logic.
function fakeApiCall(url) 
{
    return new Promise(resolve => 
        {
            setTimeout(() => resolve(`Result from ${url}`), 400);
        });
}
fakeApiCall("api/data1")
    .then(response1 => fakeApiCall("api/data2?ref=" + response1))
    .then(response2 => console.log("Final API result:", response2));



// 8. Error propagation lets you catch problems anywhere in a promise chain.
// If any step fails, the catch block will be triggered.
Promise.resolve("okay")
    .then(val => 
        {
            throw new Error("Something broke!");
            return val;
        })
    .catch(err => console.error("Caught:", err.message));



// 9. Rejections should always be caught—otherwise they'll disappear silently.
// Using catch at the end of a chain is a common safeguard.
function riskyStep() 
{
    return new Promise((_, reject) => reject("Step failed"));
}
riskyStep()
    .then(() => console.log("This won’t run"))
    .catch(err => console.error("Handled error:", err));



// 10. Use Promise.race() to set timeouts on slow operations.
// Whichever promise settles first wins—useful for enforcing deadlines.
function slowTask() 
{
    return new Promise(resolve => setTimeout(() => resolve("Too slow"), 5000));
}
function timeout(ms) 
{
    return new Promise((_, reject) =>
        setTimeout(() => reject("Timed out"), ms)
    );
}
Promise.race([slowTask(), timeout(2000)])
    .then(result => console.log(result))
    .catch(err => console.error("Race error:", err));



// 11. You can chain multiple .then calls without needing intermediate variables.
// This makes promise chains compact and focused on the sequence, not storage.
Promise.resolve(1)
    .then(n => n + 1)
    .then(n => n * 2)
    .then(n => console.log("Chained result:", n));  // Should log 4



// 12. Promises protect against Zalgo: all callbacks run async, even if resolved now.
// This ensures consistent timing—your logic always runs predictably later.
const p = Promise.resolve("Already done");
p.then(() => console.log("Always async"));



// 13. Trust is the foundation of Promises—you can always expect only one resolution.
// Promises can’t be changed or fired more than once, avoiding many classic async bugs.
const pTrust = new Promise((resolve, reject) => 
{
    resolve("Final value");
    resolve("Ignored");
    reject("Also ignored");
});
pTrust.then(v => console.log("Promise settled once:", v));



// 14. Use catch() as a cleaner way to handle errors at the end of promise chains.
// It's equivalent to then(null, errorHandler) but more expressive.
Promise.reject("Something went wrong")
    .catch(err => console.error("Handled via catch():", err));
