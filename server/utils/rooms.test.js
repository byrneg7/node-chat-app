const expect = require('expect');
const { Rooms } = require('./rooms');

describe('Rooms', () => {
    var rooms;

    beforeEach(() => {
        rooms = new Rooms();
        rooms.rooms = ['dublin1', 'wicklow friends', 'python course']
    })

    it('should add new room', () => {
        var rooms = new Rooms()
        var room = 'test'
        rooms.addRoom(room);

        expect(rooms.rooms).toEqual([room]);
    });

    it('should not add new room if name taken', () => {
        var testRoom = rooms.rooms[0];
        rooms.addRoom(testRoom);
        
        expect(rooms.rooms.length).toBe(3);
    });

    it('should remove a room', () => {
        var removeThis = rooms.rooms[0];
        rooms.removeRoom(removeThis);

        expect(rooms.rooms.length).toBe(2);
    });

    it('should not remove room with incorrect name', () => {
        var removeThis = 'test';
        rooms.removeRoom(removeThis);

        expect(rooms.rooms.length).toBe(3);
    });

    it('should find room index valid name', () => {
        var roomName = rooms.rooms[0];
        var index = rooms.getRoomIndex(roomName);

        expect(index).toBe(0);
    });

    it('should not find a room index with invalid name', () => {
        var roomName = 'test';

        var index = rooms.getRoomIndex(roomName);
        expect(index).toBeUndefined()
    });


});




