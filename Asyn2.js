// 1. Async Continuation with setTimeout
// Simulates loading a user profile after a delay — mimics real-world delays like server response.
setTimeout(() => 
    {
	    console.log("Loaded profile for: VATSAl");
    }, 1000);



// 2. Callback Hell: Nested Callbacks
// Each step depends on the previous one in deeply nested structure, making the flow hard to read.

onEvent("login-button", function handleLoginClick()     
{
	setTimeout(() => 
        {
		    checkUserSession("user42", function (session) 
            {
			    if (session.valid) 
                    {
				        console.log("Session is valid. Welcome!");
			        } 
                else 
                    {
				        handleLoginClick(); // retry
			        }
		    });
	    }, 300);
});




// 3. Flattened Callbacks with Named Functions
// Rewrites nested callbacks into named functions for better readability and modularity.

onEvent("auth-button", startLogin);

function startLogin() 
{
	setTimeout(validateUser, 300);
}

function validateUser() 
{
	checkUserSession("user42", processResult);
}

function processResult(session) 
{
	if (session.valid) 
        {
		    console.log("Authenticated via named functions!");
	    } 
    else 
        {
		    startLogin();
	    }
}



// 4. Latch Pattern to Prevent Multiple Executions
// Prevents executing critical logic more than once even if the callback runs multiple times.
let charged = false;
const analytics = 
{
	trackSale(data, callback) 
    {
		// Sometimes call multiple times (bad behavior)
		callback();
		callback();
	}
};

analytics.trackSale({ item: "TV" }, function () 
{
	if (!charged) 
        {
		    charged = true;
		    console.log("Charging card and confirming order...");
	    }
});



// 5. Insecure Addition without Type Safety
// Adds two values but doesn't check their type — could result in string concatenation errors.
function addRaw(a, b) 
{
	return a + b; // Could be a string if input is invalid
}


// 6. Safe Addition with Strict Type Checks
// Adds only numbers and throws an error for invalid input — ensures accurate math.
function addSafe(a, b) 
{
	if (typeof a !== "number" || typeof b !== "number") 
        {
		    throw new Error("Inputs must be numbers.");
	    }
	return a + b;
}

// 7. Flexible Addition with Type Coercion
// Safely converts input to numbers before adding — helps with user inputs like strings.
function addFlexible(a, b) 
{
	return Number(a) + Number(b);
}



// 8. Split Callbacks for Success and Error
// Separates logic for success and failure to keep code paths clear and explicit.
function onSuccess(data) 
{
	console.log("Success:", data);
}

function onFail(err) 
{
	console.error("Error:", err);
}

fetchOrder("order101", onSuccess, onFail);

// 9. Error-First Callback Style (Node.js Convention)
// Combines success and error handling in one function using the first argument as error check.
function handleOrder(err, receipt) 
{
	if (err) 
        {
		    console.error("Failed:", err);
	    } 
    else 
        {
		    console.log("Order received:", receipt);
	    }
}

fetchOrder("order102", handleOrder);


// 10. Timeout Wrapper to Avoid Hanging
// Adds a timeout to a callback — prevents infinite waiting if the async call never completes.
function withTimeout(fn, ms) 
{
	let timer = setTimeout(() => fn(new Error("Timeout")), ms);
	return function (...args)
     {
		if (timer)
        {
			clearTimeout(timer);
			fn(null, ...args);
		}
	};
}



// 11. Using Timeout to Guard Critical Logic
// Ensures a fallback is triggered if the delivery callback is never fired in time.
function handleDelivery(err, packageInfo) 
{
	if (err) console.error("Delivery error:", err);
	else console.log("Delivered:", packageInfo);
}

trackDelivery("box999", withTimeout(handleDelivery, 1000));


// 12. Zalgo Problem: Sync vs Async Callbacks
// Shows how unpredictable timing (sync or async) can affect the value of shared variables.
function showUser(user) 
{
	console.log("User ID:", userId);
}

let userId = 1;
loadCachedUser("user42", showUser);
userId++;

// 13. alwaysAsync: Forcing Consistent Async Execution
// Ensures that callbacks always run asynchronously, even if the data is already available.
function alwaysAsync(fn) 
{
	let original = fn;
	let timer = setTimeout(() => 
        {
		    timer = null;
		    if (fn) fn();
	    }, 0);

	fn = null;

	return function (...args) 
    {
		if (timer) 
            {
			    fn = original.bind(this, ...args);
		    } 
            else 
            {
			    original.apply(this, args);
		    }
	};
}

let anotherUserId = 10;
loadCachedUser("user43", alwaysAsync(function (user) 
{
	console.log("Consistent async:", anotherUserId);
}));
anotherUserId++;

// Simulated onEvent Utility
// Simulates an event listener that fires after a short delay — like listening to UI clicks.

function onEvent(name, callback) 
{
	console.log(`Listening for: ${name}`);
	setTimeout(callback, 500);
}

// Simulated checkUserSession Utility
// Mocks checking a user session with a random result after a brief delay.

function checkUserSession(userId, callback) 
{
	setTimeout(() => 
        {
		    callback({ valid: Math.random() > 0.5 });
	    }, 200);
}




// Simulated fetchOrder Utility
// Pretends to fetch order data, sometimes failing to simulate real-world network unpredictability.
function fetchOrder(id, success, failure = () => {}) 
{
	setTimeout(() => 
        {
		    if (Math.random() > 0.3) 
                {
			        success({ id, status: "ok" });
		        } 
            else 
                {
			        failure(new Error("Order failed"));
		        }
	    }, 300);
}


// Simulated trackDelivery Utility
// Emulates a delivery tracking system that may succeed or timeout based on randomness.
function trackDelivery(id, callback) 
{
	setTimeout(() => 
        {
		    callback(null, { id, delivered: true });
	    }, Math.random() > 0.2 ? 400 : 1500); // May timeout
}

// Simulated loadCachedUser Utility
// Loads cached user data either immediately or asynchronously — helps demonstrate Zalgo.
function loadCachedUser(username, callback) 
{
	if (Math.random() > 0.5) 
        {
		    callback({ name: username }); // sync
	    } 
    else 
         {
		    setTimeout(() => callback({ name: username }), 0); // async
	     }
}
