// 1: Basic generator pause/resume
// Generator pauses with yield, then resumes execution later.
function *simpleTask() 
{
	console.log("Step 1");
	yield;
	console.log("Step 2 resumed later");
}
const step = simpleTask();
step.next(); // Step 1
step.next(); // Step 2 resumed later


// 2: Generator that returns computed result
// Like a normal function, but paused via yield.
function *multiply(x, y) 
{
	yield; // Just to show it can pause
	return x * y;
}
const calc = multiply(6, 7);
calc.next(); 
console.log(calc.next().value); // 42



// 3: Yield with input sent back in
// Yield can pause and later accept a value sent via next().
function *compute(x) 
{
	const y = x * (yield);
	return y;
}
const iterator = compute(6);
iterator.next();        // pause at yield
console.log(iterator.next(7).value); // 6 * 7 = 42

//4: Generator as a value producer
// Continues to yield next value in a sequence (infinite producer).
function *sequence() 
{
	let val = 1;
	while (true) 
    {
		yield val;
		val = val * 2;
	}
}
const gen = sequence();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 4



// 5: Using generator with for..of
// Automatically pauses and resumes generator for each value.
function *countToFive() 
{
	for (let i = 1; i <= 5; i++) 
    {
		yield i;
	}
}
for (const num of countToFive()) 
{
	console.log(num);
}



// 6: Delegating to another generator
// One generator can yield values from another using yield*
function *alpha() 
{
	yield "A";
	yield "B";
}
function *alphabet() 
{
	yield "Start";
	yield* alpha(); // delegates
	yield "End";
}
for (const ch of alphabet()) 
{
    console.log(ch);
}



//7: Generator + Promise with manual resumption
// Useful for async flow control with readable, linear structure.
function request(url) 
{
	return new Promise((resolve) =>
		setTimeout(() => resolve(`Data from ${url}`), 500)
	);
}
function *main() 
{
	try 
    {
		const data = yield request("https://api.example.com");
		console.log("Fetched:", data);
	} 
    catch (err) 
    {
		console.error("Error:", err);
	}
}
const it = main();
const p = it.next().value;
p.then(res => it.next(res)).catch(err => it.throw(err));



// 8: Generator-runner to abstract async flow
// Automates yielding/resuming over promises for multiple steps.
function run(genFunc) 
{
	const it = genFunc();

	return Promise.resolve().then(function handleNext(val) 
    {
		const next = it.next(val);
		if (next.done) return next.value;

		return Promise.resolve(next.value).then(handleNext, err =>
			Promise.resolve(it.throw(err)).then(handleNext)
		);
	});
}
function *fetchMultiple() 
{
	const one = yield request("url1");
	const two = yield request("url2");
	console.log("Done:", one, two);
}
run(fetchMultiple);

// 9: Yielding from composed async logic
// Promises abstracted inside helper functions improve clarity.
function getCombinedData() 
{
	return Promise.all([request("urlA"), request("urlB")]);
}
function *loadData() 
{
	const [a, b] = yield getCombinedData();
	const result = yield request(`urlC?data=${a}&${b}`);
	console.log("Final:", result);
}
run(loadData);

//10: Generator concurrency coordination
// Simulates two generators working together via shared object.
function runAll(...gens) 
{
	const data = {};
	const iters = gens.map(gen => gen(data));

	function stepAll() 
    {
		return Promise.all(iters.map(it => 
        {
			const next = it.next();
			return Promise.resolve(next.value);
		}));
	}

	return stepAll();
}

runAll(
	function* (data) 
    {
		const response = yield request("gen1");
		data.first = response;
	},
	function* (data) 
    {
		const response = yield request("gen2");
		data.second = response;
	}
);

// 11: Generator with input/output messaging loop
// Shows how generators can pause, wait for input, and produce output.
function *interactive() 
{
	const input = yield "Tell me something";
	console.log("You said:", input);
}
const convo = interactive();
console.log(convo.next().value); // Ask
convo.next("Hello Generator!");  // Reply

//12: Generator-based number stream with early break
// for..of can cleanly consume values and terminate early.
function *infiniteStream() 
{
	let val = 1;
	while (true) 
        {
		    yield val;
		    val = val * 2 + 1;
    	}
}
for (const n of infiniteStream()) 
{
	if (n > 50) break;
	console.log(n);
}
