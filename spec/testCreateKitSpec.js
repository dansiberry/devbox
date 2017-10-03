var request = require("request");
var requestWithCookie = request.defaults({jar: true})
var base_url = "http://localhost:3000/"
var Kit = require('../models/kit.js');

let validKitHash = {
  "kitTitle": "Kit title Jasmine test",
  "kitContent": "Kit content jasmine test",
  "sections": [{
      "sectionTitle": "Section 1 jasmine test",
      "sectionContent": "S1 content jasmine test"
    },
    {
      "sectionTitle": "Section 2 jasmine test",
      "sectionContent": "s2 content jasmine test"
    }
  ],
  "resources": {
    "sec-0": {
      "no-1": {
        "resourceTitle": "Resource 1 title (S1) jasmine test",
        "resourceLink": "r1 content jasmine test"
      },
      "no-5": {
        "resourceTitle": "Resource 2 title (S1) jasmine test",
        "resourceLink": "r2 content jasmine test"
      }
    },
    "sec-1": {
      "no-2": {
        "resourceTitle": "Resource 3 title (S2) jasmine test",
        "resourceLink": "r3 content jasmine test"
      }
    }
  }
}

describe('test create kit method', function() {
  it('should redirect to error when POST is not a valid hash', function(done) {
     spyOn(Kit, 'createKit');
     request.post({url: 'http://localhost:3000/kits/new', form: {empty: 'hash' }}, function(err, httpResponse, body){
       expect(Kit.createKit).not.toHaveBeenCalled();
       expect(body).toContain("All fields are required to create the linkbox")
       done()
     })
  });
  it('should call kitCreate when the hash is valid', function(done) {
     request.post({url: 'http://localhost:3000/kits/new', form: validKitHash,  followAllRedirects: true}, function(err, httpResponse, body){
       expect(body).toContain("Kit title Jasmine test")
       done()
     })
  });
});
