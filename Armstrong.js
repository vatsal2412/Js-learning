// Armstrong number: sum of digits^n equals the number itself
// For example, 153 = 1³ + 5³ + 3³

function isArmstrong(num) {
	const digits = num.toString().split("");
	const power = digits.length;
	const sum = digits.reduce((acc, digit) => acc + Math.pow(Number(digit), power), 0);
	return sum === num;
}

// Check a single number
let number = 9474;
console.log(`${number} is${isArmstrong(number) ? "" : " not"} an Armstrong number.`);

//Find Armstrong numbers in a range
function findArmstrongInRange(start, end) {
	console.log(`\nArmstrong numbers from ${start} to ${end}:`);
	for (let i = start; i <= end; i++) {
		if (isArmstrong(i)) {
			console.log(i);
		}
	}
}

findArmstrongInRange(1, 10000);
