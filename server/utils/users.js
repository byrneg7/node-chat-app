// [{
//     id: '23raaf11fag',
//     userName: 'Greg',
//     room: 'Dublin1'
// }]

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room) //filters out any objects which dont have a room prop matching
        var namesArray = users.map((user) => user.name)

        return namesArray;
    }
}
module.exports = { Users };

//constructor gets called by default to initialize each instance
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// var me = new Person('Greg', 25);
// console.log(me.getUserDescription());
