var expect = require('expect');

var { generateMessage } = require('./message');
var { generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
    });
});


//if you put in 1,2 get this: {url: `https://www.google.com/maps?q=1,2`}
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = "testUser"
        var lat = 1;
        var long = 2;
        var url = `https://www.google.com/maps?q=${lat},${long}`
        var location = generateLocationMessage(from, lat, long);

        expect(typeof location.createdAt).toBe('number');
        expect(location.url).toBe('https://www.google.com/maps?q=1,2');
        expect(location).toMatchObject({
            from,
            url
        });
    });
});

