const expect = require("expect");
var {Users} = require("./users.js");


describe("Users",() => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'A',
            room: '1'
        },{
            id: 2,
            name: 'B',
            room: '2'
        },{
            id: 3,
            name: 'C',
            room: '1'
        }];
    });

    it("should add new user",() => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Dk',
            room: 'no one'
        }
        var res = users.addUser(user.id,user.name,user.room); 
        expect(users.users).toEqual([user]);
    });

    it("should return names of users",() => {
        var userList = users.getUserList('1');
        expect(userList).toEqual(['A','C']);
    });

    it("should remove a user",() => {
        var user = users.removeUser(1);
        expect(user.id).toBe(1);
        expect(users.users.length).toBe(2);
    });

    it("should not remove a user",() => {
        var user = users.removeUser(4);
        expect(users.users.length).toBe(3);
        expect(user).not.toBeDefined;
    });

    it("should find a user",() => {
        var user = users.getUser(2);
        expect(user.id).toBe(2);
    });

    it("should not find a user",() => {
        var user = users.getUser(4);
        expect(user).not.toBeDefined;
    });
});
