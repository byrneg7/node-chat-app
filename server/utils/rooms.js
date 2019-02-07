class Rooms {
    constructor() {
        this.rooms = [];
    }

    addRoom(roomName) {
        var lowerCaseRoomName = roomName.toLowerCase();
        if (this.rooms.includes(lowerCaseRoomName)) {
            //callback('room name already taken');
        } else {
            this.rooms.push(lowerCaseRoomName);
            return roomName;
        }
    }

    removeRoom(roomName) {
        var lowerCaseRoomName = roomName.toLowerCase();
        var index = this.getRoomIndex(lowerCaseRoomName);
            if (index !== undefined) {
            this.rooms.splice(index, 1)
        }
        return roomName;
    }

    getRoomIndex(roomName) {
        var lowerCaseRoomName = roomName.toLowerCase();
        var index;
        if (this.rooms.includes(roomName)) {
            index = this.rooms.indexOf(lowerCaseRoomName);
        } else {
            index = undefined;
        }
        return index;
    }
}

module.exports = { Rooms };