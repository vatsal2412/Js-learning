// Interactive To-Do List — Human Command-Line Interface
const readline = require("readline");

// Constructor with prototype for shared behavior
function ToDoList(owner) {
	this.owner = owner;
	this.tasks = [];
}

ToDoList.prototype = {
	add(task) {
		if (typeof task !== "string" || !task.trim()) {
			console.log("Please enter a valid task.");
			return;
		}
		this.tasks.push(task);
		console.log(` Task added: "${task}"`);
	},
	list() {
		if (this.tasks.length === 0) {
			console.log(" Your to-do list is empty.");
			return;
		}
		console.log(`\n ${this.owner}'s To-Do List:`);
		this.tasks.forEach((task, i) => {
			console.log(`${i + 1}. ${task}`);
		});
		console.log();
	},
	remove(index) {
		if (
			isNaN(index) ||
			index < 1 ||
			index > this.tasks.length
		) {
			console.log(" Invalid task number.");
			return;
		}
		const removed = this.tasks.splice(index - 1, 1);
		console.log(` Removed: "${removed[0]}"`);
	}
};

// Create list instance
const todo = new ToDoList("You");

// Setup interactive CLI
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Welcome prompt
console.log(" Welcome to Your Interactive To-Do List!");
console.log("Type one of: add, list, remove, exit\n");

function ask() {
	rl.question(" What would you like to do? ", function (command) {
		command = command.trim().toLowerCase();

		switch (command) {
			case "add":
				rl.question(" Enter a task to add: ", function (task) {
					todo.add(task);
					ask(); // loop again
				});
				break;

			case "list":
				todo.list();
				ask();
				break;

			case "remove":
				todo.list();
				rl.question(" Enter task number to remove: ", function (num) {
					todo.remove(Number(num));
					ask();
				});
				break;

			case "exit":
				console.log(" Goodbye!");
				rl.close();
				break;

			default:
				console.log(" Unknown command. Use add, list, remove, or exit.");
				ask();
		}
	});
}

// Start loop
ask();
