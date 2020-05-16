// good reference to understand classess
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

// model to define a User Class
class User {

	id = "";//uuidv4(); // public field
	name = "";
	avatar = "";

	constructor(name) {
		// check if the user was already createed.
        this.id =  localStorage.getItem('id') || uuidv4(); // create a new ID
        this.name = name;
        this.avatar = "https://api.adorable.io/avatars/64/"+this.id+"@adorable.png";
        localStorage.setItem('id',  this.id);
	}
}