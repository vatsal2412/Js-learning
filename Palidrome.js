//  Check if a string is a palindrome (same forward and backward)
// Uses string methods, coercion, and clean control flow
function isPalindrome(input) {
	if (typeof input !== "string") return false;

	const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
	const reversed = cleaned.split("").reverse().join("");
	return cleaned === reversed;
}

// Test cases
console.log(isPalindrome("Racecar"));  // true
console.log(isPalindrome("No lemon, no melon")); // true
console.log(isPalindrome("Hello"));    // false

// Using IIFE for isolation
(function () {
	const word = "madam";
	console.log(`"${word}" is palindrome: ${isPalindrome(word)}`);
})();