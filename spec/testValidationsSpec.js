var request = require("request");
var base_url = "http://localhost:3000/"
var Kit = require('../models/kit.js');

describe('check model validations for kit', function() {
    it('should be invalid without a title', function(done) {
        let kit = new Kit
        kit.link = "testlink"
        kit.validate(function(err) {
            expect(err.errors.title.name).toEqual('ValidatorError');
            expect(Object.keys(err.errors).length).toEqual(1);
            done();
        });
    });
    it('should be invalid without a link', function(done) {
        let kit = new Kit
        kit.title = "testTitle"
        kit.validate(function(err) {
            expect(err.errors.link.name).toEqual('ValidatorError');
            expect(Object.keys(err.errors).length).toEqual(1);
            done();
        });
    });
});
