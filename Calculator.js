//  A simple calculator 
// Demonstrates function scope, closures, coercion, and type checks
function createCalculator() {
	let memory = 0;

	return {
		add(n) {
			memory += Number(n);
			return memory;
		},
		sub(n) {
			memory -= Number(n);
			return memory;
		},
		mul(n) {
			memory *= Number(n);
			return memory;
		},
		div(n) {
			if (n == 0) return "Cannot divide by zero!";
			memory /= Number(n);
			return memory;
		},
		reset() {
			memory = 0;
			return memory;
		},
		show() {
			return `Result: ${memory}`;
		}
	};
}

// Usage
const calc = createCalculator();
console.log(calc.add(10));      // 10
console.log(calc.mul(2));       // 20
console.log(calc.div("4"));     // 5
console.log(calc.sub(1));       // 4
console.log(calc.show());       // Result: 4
console.log(typeof calc.show);  // function