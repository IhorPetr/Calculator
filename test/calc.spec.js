/**
 * Created by Igor on 04.09.2017.
 */
var assert = require('assert');
var calc = require('../app/Calc');

describe('Calculator spec', function () {
    it('should return 3 for simple query', function () {
        assert.equal(3,calc("1+2"));
    });
    it('should return 3 for query  ', function () {
        assert.equal(3,calc("(1+2)"));
    });
    it('should return 3.1 for query  ', function () {
        assert.equal(3.1,calc("(1.1+2)"));
    });
    it('should return 2 for query ', function () {
        assert.equal(2,calc("3-1"));
    });
    it('should return 2 for query ', function () {
        assert.equal(2,calc("(3-1)"));
    });
    it('should return 3.1 for query ', function () {
        assert.equal(2.1,calc("(3.1-1)"));
    });
    it('should return 4 for query ', function () {
        assert.equal(4,calc("2*2"));
    });
    it('should return 4.2 for query ', function () {
        assert.equal(4.2,calc("2.1*2"));
    });
    it('should return 0.5 for query ', function () {
        assert.equal(0.5,calc("1/2"));
    });
    it('should return 0.5 for query ', function () {
        assert.equal(0.5,calc("(1/2)"));
    });
    it('should return 0.55 for query ', function () {
        assert.equal(0.55,calc("(1.1/2)"));
    });
    it('should return 45.5 for query ', function () {
        assert.equal(25.5,calc("1/2 + 5 + 4*5"));
    });
    it('should return 45.5 for query ', function () {
        assert.equal(45.5,calc("1/2    + (5 + 4) * 5"));
    });
    it('should return 52.52 for query ', function () {
        assert.equal(52.52,calc("1/2 + (5.5 + 4.7) * 5.1"));
    });
    it('should return -52.52 for query ', function () {
        assert.equal(-52.52,calc("-1/2 + (-5.5 - 4.7) * 5.1"));
    });
    it('should return 0 for query ', function () {
        assert.equal(0,calc("0"));
    });
    it('should return 18 for query ', function () {
        assert.equal(18,calc("18"));
    });
    it('should return undefine for query ', function () {
        assert.equal(undefined,calc("(1/2 + 5 + 4*5"));
    });
    it('should return undefine for query ', function () {
        assert.equal(undefined,calc("1/2 ++ 5 + 4) * 5"));
    });
    it('should return undefine for query ', function () {
        assert.equal(undefined,calc("[1/2] + 5 + 4 * 5"));
    });
    it('should return undefine for query ', function () {
        assert.equal(undefined,calc("1/2 >> 5 + 4) * 5"));
    });
    it('should return undefine for query ', function () {
        assert.equal(undefined,calc("1/2 + 5a + 4b * 5"));
    });
    it('should return undefine for query ', function () {
        assert.equal(undefined,calc("trololo"));
    });
});