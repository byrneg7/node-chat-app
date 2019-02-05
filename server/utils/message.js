var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getHours()
    }
};

var generateLocationMessage = (from, lat, long) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${long}`,
        createdAt: new Date().getHours()
    }
};

module.exports = {generateMessage, generateLocationMessage};
