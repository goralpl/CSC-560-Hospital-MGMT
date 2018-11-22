var assert = require('assert');
var should = require('should');
var routes = require('C:\\Users\\Krzysztof Pawlikowsk\\WebstormProjects\\CSC-560-Hospital-MGMT\\routes\\patients.js');

describe('bla', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        });
    });
});

var request = {};
var response = {
    viewName: ""
    , data : {}
    , render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe("Routing", function () {
    describe("Default Route", function () {
        it("should provide the a title and the index view name", function () {
            routes.index(request, response);
            response.viewName.should.equal("index");
        });

    });
});