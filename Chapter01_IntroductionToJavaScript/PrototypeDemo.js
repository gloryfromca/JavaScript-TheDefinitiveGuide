function User(name, email) {
    this.name = name;
    this.email = email;
}

User.prototype.displayName = function () {
    return this.name + " " + this.email;
};

const user = new User("ZH", "huizhang1995@gmail.com");

console.log(user.displayName());

