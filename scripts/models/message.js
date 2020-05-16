class Message {

    constructor(message, user, type) {
        this.message = message;
        this.name = user.name;
        this.avatar = user.avatar;
        this.type = type;
    }

    string() {
        return JSON.stringify(this);
    }

}