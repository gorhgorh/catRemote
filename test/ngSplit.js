var expect = require("expect.js"),
    ngSplit = require("../lib/ngSplit");

describe("Notre premier test", function() {
    it("verifie si on passe un les argument minimums", function () {

        //ngSplit();

        expect(ngSplit()).to.throwError();;
    });
});
