var should = require("should");

var fs = require("fs");
var path = require("path");

var runLoader = require("./fakeModuleSystem");
var pugLoader = require("../");

var fixtures = path.join(__dirname, "fixtures");

describe("include", function() {
	it("should generate correct code", function(done) {
		var template = path.join(fixtures, "extend+include", "template.pug");
		runLoader(pugLoader, path.join(fixtures, "extend+include"), template, fs.readFileSync(template, "utf-8"), function(err, result) {
			if(err) throw err;

			result.should.have.type("string");
			result.should.match(/<p>/);
			result.should.match(/<\/p>/);
			result.should.match(/included\.pug/);
			result.should.match(/abc/);
			done();
		});
	});
});
