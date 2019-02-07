const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Greg',
            room: 'Dublin'
        },
        {
            id: '2',
            name: 'Iva',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'React Course'
        }]
    })


    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Greg',
            room: 'testRoom'
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });


    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user with incorrect id', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        
        expect(user).toNotExist;
        expect(users.users.length).toBe(3);
    });

    it('should find user with valid id', () => {
        var userId = '2';
        expect(users.getUser(userId)).toEqual({
            id: '2',
            name: 'Iva',
            room: 'React Course'
        })
    });

    it('should not find a user with invalid id', () => {
        var userId = '99';
        expect(users.getUser(userId)).toBe(undefined)
    });

    it('should return names for React Course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Iva', 'Julie']);
    });

    it('should return names for Dublin', () => {
        var userList = users.getUserList('Dublin');
        expect(userList).toEqual(['Greg']);
    });
});
