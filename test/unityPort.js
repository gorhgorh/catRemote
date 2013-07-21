	var should = require('should');
var tcpPort = require('../lib/unityPort');

describe('tcpPort', function() {
    describe('with no arguments', function() {
        it('returns an empty array', function() {
            var result = tcpPort();
            result.should.eql([]);
        });
    });
});