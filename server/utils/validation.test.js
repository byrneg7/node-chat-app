const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string arguments', () => {
        expect(isRealString(10)).toBeFalsy();
    });

    it('should reject whitespace string arguments', () => {
        expect(isRealString('   ')).toBeFalsy();
    });

    it('should accept non-whitespace string arguments', () => {
        expect(isRealString('Test')).toBeTruthy()
    });
});