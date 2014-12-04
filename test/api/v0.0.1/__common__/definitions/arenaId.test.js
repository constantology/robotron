var path = require('path');
var co = require('co');
var chai = require('chai');

var cothunkify = require('co-thunkify');

var expect = chai.expect;

var e = require('su-apiserver/lib/errors');

var version = require(path.resolve('test/helpers/getAPIVersion'))(module);
var module_path = 'api/' + version + '/__common__/definitions/arenaId';

var under_test = require(path.resolve(module_path));

suite(module_path, function () {
    test('throws an error if a `arenaId` is not 32 characters', cothunkify(function* () {
        var failed = false;

        try {
            under_test.arenaId.set('123456789');

            failed = true;
        }
        catch (e) {
            expect(e).to.be.an.instanceOf(Error);

            expect(e.name).to.equal('RangeError');

            expect(e.message).to.equal('Invalid Arena ID (123456789) specified.');
        }
        finally {
            expect(failed).to.be.false;
        }

        failed = false;

        try {
            under_test.arenaId.set('123456789123456789123456789123456789');

            failed = true;
        }
        catch (e) {
            expect(e).to.be.an.instanceOf(Error);

            expect(e.name).to.equal('RangeError');

            expect(e.message).to.equal('Invalid Arena ID (123456789123456789123456789123456789) specified.');
        }
        finally {
            expect(failed).to.be.false;
        }
    }));

    test('returns the `arenaId` if it is 32 characters', cothunkify(function* () {
        expect(under_test.arenaId.set('12345678912345678912345678912345')).to.equal('12345678912345678912345678912345');
    }));
});
