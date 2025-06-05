//  To-do list 
// Demonstrates constructors, `this`, arrays, closures, and methods
function ToDoList(owner) {
	this.owner = owner;
	this.tasks = [];
}

//  Shared methods via prototype
ToDoList.prototype = {
	add(task) {
		if (typeof task !== "string" || task.trim() === "") {
			console.log("Invalid task.");
			return;
		}
		this.tasks.push(task);
		console.log(`Added for ${this.owner}: ${task}`);
	},
	remove(index) {
		if (typeof index !== "number" || index < 0 || index >= this.tasks.length) {
			console.log("Index out of bounds.");
			return;
		}
		const removed = this.tasks.splice(index, 1);
		console.log(`Removed: ${removed[0]}`);
	},
	list() {
		if (this.tasks.length === 0) {
			console.log(`${this.owner} has no tasks.`);
			return;
		}
		console.log(`Tasks for ${this.owner}:`);
		this.tasks.forEach((task, i) => console.log(`${i + 1}. ${task}`));
	}
};

// Use case
const list = new ToDoList("Vatsal");
list.add("Study JavaScript");
list.add("Build a project");
list.list();
list.remove(1);
list.list();