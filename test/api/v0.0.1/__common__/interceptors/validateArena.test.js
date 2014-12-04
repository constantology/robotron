var path = require('path');
var co = require('co');
var chai = require('chai');

var cothunkify = require('co-thunkify');

var e = require('su-apiserver/lib/errors');
var session = require('su-apisession');

var expect = chai.expect;

var version = require(path.resolve('test/helpers/getAPIVersion'))(module);
var module_path = 'api/' + version + '/__common__/interceptors/validateArena';

var next = function* () {};

var under_test = require(path.resolve(module_path));

suite(module_path, function () {
    var arena_id;

    suiteSetup(cothunkify(function* () {
        arena_id = yield session.set({
            foo : 'bar'
        });
    }));

    test('throws an UnauthorizedError if no Arena ID is present', cothunkify(function* () {
        var failed = false;

        try {
            yield under_test.call({
                su : { req : { } }
            }, next);

            failed = true;
        }
        catch (e) {
            expect(e).to.be.an.instanceOf(Error);

            expect(e.name).to.equal('UnauthorizedError');

            expect(e.message).to.equal('Invalid Arena.');
        }
        finally {
            expect(failed).to.be.false;
        }
    }));

    test('throws an UnauthorizedError if the Arena ID is not bound to a valid arena', cothunkify(function* () {
        var failed = false;

        try {
            yield under_test.call({
                su : { req : {
                    xcsrf : 'thisnoexistings'
                } }
            }, next);

            failed = true;
        }
        catch (e) {
            expect(e).to.be.an.instanceOf(Error);

            expect(e.name).to.equal('UnauthorizedError');

            expect(e.message).to.equal('Invalid Arena.');
        }
        finally {
            expect(failed).to.be.false;
        }
    }));

    test('adds the Arena data to the context if one is found', cothunkify(function* () {
        var context = {
                su : { req : {
                    xcsrf : arena_id
                } }
            };

        yield under_test.call(context, next);

        expect(context.su.req.arena).to.deep.equal({foo : 'bar'});
    }));
});
