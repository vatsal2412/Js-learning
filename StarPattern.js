// Star Patterns Program
const size = 5;

// 1. Left-Aligned Triangle
// Each row adds one more star on the left side
console.log("1. Left-Aligned Triangle:");
for (let i = 1; i <= size; i++) {
	console.log("*".repeat(i));
}
console.log("");

// 2. Right-Aligned Triangle
// Pads spaces on the left to align stars to the right
console.log("2. Right-Aligned Triangle:");
for (let i = 1; i <= size; i++) {
	let spaces = " ".repeat(size - i);
	let stars = "*".repeat(i);
	console.log(spaces + stars);
}
console.log("");

// 3. Centered Pyramid
// Builds a symmetrical pyramid by combining spaces and stars
console.log("3. Centered Pyramid:");
for (let i = 1; i <= size; i++) {
	let spaces = " ".repeat(size - i);
	let stars = "*".repeat(2 * i - 1);
	console.log(spaces + stars);
}
console.log("");

// 4. Inverted Left-Aligned Triangle
// Starts from full width and reduces each row
console.log("4. Inverted Left-Aligned Triangle:");
for (let i = size; i >= 1; i--) {
	console.log("*".repeat(i));
}
console.log("");

// 5. Full Diamond
// Combines top and bottom pyramids for a diamond shape
console.log("5. Full Diamond:");
// Top
for (let i = 1; i <= size; i++) {
	let spaces = " ".repeat(size - i);
	let stars = "*".repeat(2 * i - 1);
	console.log(spaces + stars);
}
// Bottom
for (let i = size - 1; i >= 1; i--) {
	let spaces = " ".repeat(size - i);
	let stars = "*".repeat(2 * i - 1);
	console.log(spaces + stars);
}