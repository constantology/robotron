var path = require('path');
var url = require('url');

var co = require('co');
var chai = require('chai');

var cothunkify = require('co-thunkify');

var request = require('co-request');

var CONFIG = require('config');

CONFIG.app.port = CONFIG.app.port + 1;

var expect = chai.expect;

var module_path = path.resolve('./');

var api = require('require-all')(path.resolve('api'));

var base_uri = {
        protocol : 'http:',
        hostname : 'localhost',
        port : CONFIG.app.port,
        pathname : '/api/stable'
    };


suite(module_path, function() {
    var app, arena_id;

    suiteSetup(cothunkify(function* () {
        // start server
        app = yield require('su-apiserver')(api);
    }));

    suiteTeardown(cothunkify(function* () {
        // start server
        app.close();

        CONFIG.app.port = CONFIG.app.port - 1;
    }));

    test('create arena', cothunkify(function* () {
        var response = yield request({
            form : {
                length : 5,
                width : 5
            },
            json : true,
            method : 'post',
            uri : url.format(base_uri) + '/arena'
        });

        expect(response.body.data.id).to.be.a.string;
        expect(response.body.data.id.length).to.equal(32);

        arena_id = response.body.data.id;
    }));

    test('1 2 N / LMLMLMLMM => 1 3 N', cothunkify(function* () {
        var response = yield request({
            body : {
                position : {
                    x : 1,
                    y : 2,
                    direction : 'N'
                },
                instructions : ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']
            },
            headers : {
                'X-CSRF-Token' : arena_id
            },
            json : true,
            method : 'post',
            uri : url.format(base_uri) + '/robot'
        });

        expect(response.body.data).to.deep.equal({
            x : 1,
            y : 3,
            direction : 'N'
        });
    }));

    test('3 3 E / MMRMMRMRRM => 5 1 E', cothunkify(function* () {
        var response = yield request({
            body : {
                position : {
                    x : 3,
                    y : 3,
                    direction : 'E'
                },
                instructions : ['M', 'M', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M']
            },
            headers : {
                'X-CSRF-Token' : arena_id
            },
            json : true,
            method : 'post',
            uri : url.format(base_uri) + '/robot'
        });

        expect(response.body.data).to.deep.equal({
            x : 5,
            y : 1,
            direction : 'E'
        });
    }));
});
