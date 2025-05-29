//Base object with general task functionality
// Holds shared methods for all task-related behaviors.
const Task = 
{
	setID(id) 
    {
		this.id = id;
	},
	showID() 
    {
		console.log(`Task ID: ${this.id}`);
	}
};

// Task-specific object linked to Task
// Delegates common logic to Task while keeping its own data.
const DownloadTask = Object.create(Task);
DownloadTask.init = function(id, file) 
{
	this.setID(id);
	this.file = file;
};
DownloadTask.start = function() 
{
	this.showID(); // delegated
	console.log(`Downloading: ${this.file}`);
};
DownloadTask.init("DL1001", "movie.mp4");
DownloadTask.start();
// Task ID: DL1001
// Downloading: movie.mp4


//Another task object reusing base behavior
// Demonstrates independent delegation with different data.
const UploadTask = Object.create(Task);
UploadTask.init = function(id, destination) 
{
	this.setID(id);
	this.destination = destination;
};
UploadTask.start = function() 
{
	this.showID(); // shared utility
	console.log(`Uploading to: ${this.destination}`);
};
UploadTask.init("UP2024", "cloud/storage");
UploadTask.start();
// Task ID: UP2024
// Uploading to: cloud/storage


//UI utility object with shared rendering logic
// Used by many UI elements to standardize layout handling.
const UIElement = 
{
	setup(width, height) 
    {
		this.width = width || 100;
		this.height = height || 40;
		this.$elem = null;
	},
	insert($target) 
    {
	    if (this.$elem) 
            {
			    this.$elem.css(
                    {
				        width: this.width + "px",
				        height: this.height + "px"
			        }).appendTo($target);
		    }
	}
};

//Button object linked to UIElement
// Extends UI with specific logic for user interaction.
const FancyButton = Object.create(UIElement);
FancyButton.build = function(width, height, label) 
{
	this.setup(width, height);
	this.label = label || "Click Me";
	this.$elem = $("<button>").text(this.label);
};
FancyButton.render = function($target) 
{
	this.insert($target); // reuse from UIElement
	this.$elem.click(this.handleClick.bind(this));
};
FancyButton.handleClick = function() 
{
	console.log(`You clicked: ${this.label}`);
};


// Controller object for basic error handling
// Can be linked to other logic controllers to provide fallback display.
const ErrorHandler = 
{
	logs: [],
	showError(message) 
    {
		this.logs.push(message);
		console.log("Error:", message);
	}
};

// 🔹 FormHandler that delegates to ErrorHandler
// Demonstrates clean error handling via behavior delegation.
const FormHandler = Object.create(ErrorHandler);
FormHandler.validate = function(username, password) 
{
	if (!username || !password) 
    {
		return this.showError("Missing credentials");
	}
	if (password.length < 6) 
    {
		return this.showError("Password too short");
	}
	console.log("Form validated!");
};
FormHandler.validate("admin", "123");  // Password too short
FormHandler.validate("admin", "123456"); // Form validated!


// 🔹 Ajax handler that reuses validation via delegation
// Behavior delegation avoids needing inheritance + composition.
const AjaxHandler = Object.create(FormHandler);
AjaxHandler.send = function(username, password) 
{
	if (!this.validate(username, password)) return;
	console.log(`Sending credentials for ${username}...`);
	// Fake async for illustration
	setTimeout(() => 
    {
		console.log("Server response: Login successful!");
	}, 1000);
};
AjaxHandler.send("vatsal", "123"); // reused validation with delegation


// 🔹 Object.create delegation is more flexible than class instantiation
// This shows runtime linking and easy reuse without constructors.
const Shape = 
{
	describe() 
    {
		console.log(`I am a ${this.type}`);
	}
};
const Circle = Object.create(Shape);
Circle.type = "Circle";

const Square = Object.create(Shape);
Square.type = "Square";

Circle.describe(); // I am a Circle
Square.describe(); // I am a Square
