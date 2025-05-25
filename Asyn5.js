// This script demonstrates high-performance techniques in Node.js:
// Worker Threads, Buffer transfer, and asm-style optimizations for speed-heavy tasks.

const 
{ 
	Worker, isMainThread, parentPort } = require("node:worker_threads");

// 1. Using Worker Threads for background processing
// This prevents blocking the main thread while heavy logic runs in parallel.
if (isMainThread) 
	{
		console.log("Main thread: starting worker...");

		const worker = new Worker(__filename); // Re-run this file in worker mode

		worker.postMessage("Start processing data");

		worker.on("message", (msg) => 
			{
				console.log("Main thread received:", msg);
			});
	} 
	else 
	{
	// Worker thread logic
	parentPort.on("message", (msg) => {
		console.log("Worker received:", msg);
		const result = `${msg} ✅ Done`;
		parentPort.postMessage(result);
	});
}

// 2. Using Buffer for binary transfer simulation
// Buffers in Node.js work similarly to ArrayBuffers—zero-copy when passed to workers.
if (isMainThread) 
{
	const buffer = Buffer.alloc(16);
	buffer[0] = 123;
	console.log("Main thread buffer[0]:", buffer[0]);
}

// 3. asm.js-style low-level computation (manual optimization)
// Mimics fast array math using typed arrays and bit-level coercion.
function asmOptimized(stdlib, foreign, heap) 
{
	"use asm";

	const arr = new stdlib.Int32Array(heap);

	function calculate(start, end) 
	{
		start = start | 0;
		end = end | 0;
		let i = 0, sum = 0, val = 0;

		for (i = start | 0; (i | 0) < (end | 0); i = (i + 1) | 0) 
			{
				val = (i * (i + 1)) | 0;
				arr[i >> 0] = val;
			}

		for (i = start | 0; (i | 0) < (end | 0); i = (i + 1) | 0) 
			{
				sum = (sum + arr[i >> 0]) | 0;
			}

		return +(sum / ((end - start) | 0));
	}

	return { calculate };
}

if (isMainThread) 
	{
		const buffer = new ArrayBuffer(0x10000);
		const math = asmOptimized(global, null, buffer);
		const result = math.calculate(10, 15);
		console.log("asm.js-style average:", result); // Should print average of computed values
	}

