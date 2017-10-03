var request = require("request");
var base_url = "http://localhost:3000/"
var Kit = require('../models/kit.js');

describe('test create kit method', function() {
  it('should redirect to error when POST is not a valid hash', function(done) {
     // spyOn(Kit, 'createKit');
     request.post({url: 'http://localhost:3000/kits/new', form: {empty: 'hash' }}, function(err, httpResponse, body){
       // expect(Kit.createKit).not.toHaveBeenCalled();
       expect("applepearalmosd").toContain("zzz")
       done()
       // expect(body.toContain("All fields are required to create the linkbox"))
     })
  });
});
