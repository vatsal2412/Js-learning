// Import readline module to handle user input from terminal
const readline = require("readline");

// ToDoList constructor function to store tasks
function ToDoList(owner) 
{
	this.owner = owner;
	this.tasks = [];
}

// Methods added to ToDoList using prototype
ToDoList.prototype = 
{
	add(task) 
	{
		if (!task || typeof task !== "string" || !task.trim()) 
			{
				console.log("Please enter a valid task.");
				return;
			}
		this.tasks.push(task);
		console.log(`Task added: "${task}"`);
	},

	list() 
	{
		if (this.tasks.length === 0) 
			{
				console.log("No tasks yet.");
				return;
			}
		console.log(`${this.owner}'s To-Do List:`);
		this.tasks.forEach((task, i) => 
		{
			console.log(`${i + 1}. ${task}`);
		});
	},

	remove(index) 
	{
		if (isNaN(index) || index < 1 || index > this.tasks.length) 
		{
			console.log("Invalid task number.");
			return;
		}
		const removed = this.tasks.splice(index - 1, 1);
		console.log(`Removed: "${removed[0]}"`);
	}
};

// Set up interface for terminal input/output
const rl = readline.createInterface(
{
	input: process.stdin,
	output: process.stdout
});

// Create a new to-do list for the user
const todo = new ToDoList("User");

// Array to store active reminders
let reminders = [];

// Global reminder checker using setInterval
setInterval(() => 
	{
		const now = new Date();
		reminders.forEach((reminder) => 
		{
			if (!reminder.shown && now >= reminder.targetDate) 
			{
				console.log(`\n🔔 Reminder: ${reminder.msg}`);
				reminder.shown = true;
			}
		});
	}, 1000);

// Display the main menu options
function showMenu() 
{
	console.log(`TO-DO LIST MENU
	1. Add Task
	2. Remove Task
	3. Show Tasks
	4. Add Reminder
	5. Show Reminders
	6. Delete Reminder
	7. Edit Reminder
	8. Exit`);

	rl.question("Select an option (1-8): ", handleMenu);
}

// Handle main menu choice
function handleMenu(choice) 
{
	switch (choice.trim()) 
	{
		case "1":
			rl.question("Enter task: ", (task) => 
			{
				todo.add(task);
				showMenu();
			});
			break;

		case "2":
			todo.list();
			rl.question("Enter task number to remove: ", (num) => 
			{
				todo.remove(Number(num));
				showMenu();
			});
			break;

		case "3":
			todo.list();
			showMenu();
			break;

		case "4":
			addReminder();
			break;

		case "5":
			showReminders();
			showMenu();
			break;

		case "6":
			showReminders();
			rl.question("Enter reminder number to delete: ", (num) => 
			{
				deleteReminder(Number(num));
				showMenu();
			});
			break;

		case "7":
			showReminders();
			rl.question("Enter reminder number to edit: ", (num) => {
				editReminder(Number(num));
			});
			break;

		case "8":
			console.log("Goodbye!");
			rl.close();
			break;

		default:
			console.log("Invalid input. Try again.");
			showMenu();
	}
}

// Add a new reminder
function addReminder() 
{
	rl.question("Reminder message: ", (msg) => 
		{
			rl.question("Date (YYYY-MM-DD): ", (dateStr) => 
				{
					rl.question("Time (HH:mm:ss): ", (timeStr) => 
						{
							const targetDate = new Date(`${dateStr}T${timeStr}`);
							const now = new Date();
			
							if (isNaN(targetDate.getTime()) || targetDate <= now) 
							{
								console.log("Invalid or past date/time.");
								showMenu();
								return;
							}

							reminders.push({ msg, targetDate, shown: false });
							console.log(`Reminder set for ${targetDate.toLocaleString()}`);
							showMenu();
						});
				});
		});
}

// Display all current reminders
function showReminders() 
{
	if (reminders.length === 0) 
	{
		console.log("No reminders set.");
		return;
	}
	console.log("Current Reminders:");
	reminders.forEach((reminder, i) => 
	{
		console.log(`${i + 1}. "${reminder.msg}" at ${reminder.targetDate.toLocaleString()}`);
	});
}

// Delete a reminder by index
function deleteReminder(index) 
{
	if (index < 1 || index > reminders.length) 
	{
		console.log("Invalid reminder number.");
		return;
	}
	const removed = reminders.splice(index - 1, 1)[0];
	console.log(`Removed reminder: "${removed.msg}"`);
}

// Edit a reminder (update message and time)
function editReminder(index) 
{
	if (index < 1 || index > reminders.length) 
	{
		console.log("Invalid reminder number.");
		showMenu();
		return;
	}

	rl.question("New message: ", (newMsg) => 
		{
			rl.question("New Date (YYYY-MM-DD): ", (dateStr) => 
			{
				rl.question("New Time (HH:mm:ss): ", (timeStr) => 
					{
						const newDate = new Date(`${dateStr}T${timeStr}`);
						const now = new Date();
		
						if (isNaN(newDate.getTime()) || newDate <= now) 
						{
							console.log("Invalid or past date/time.");
							showMenu();
							return;
						}

						reminders[index - 1] = {
										msg: newMsg,
										targetDate: newDate,
										shown: false
									};

						console.log(`Reminder updated to "${newMsg}" at ${newDate.toLocaleString()}`);
						showMenu();
					});
			});
		});
}

// Start the application
console.log("Welcome to Your To-Do list");
showMenu();
