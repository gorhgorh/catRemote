var expect = require("expect.js"),
	moveServos = require("../cat");

describe("Notre premier test", function() {
	it("montre que ça marche même quand on est au bord", function () {
		var x = -1,
		fauxMoveX = function (sliderX) {x = sliderX;},
		fauxMoveY = function () {};
		moveServos(0, 13, fauxMoveX, fauxMoveY);

		expect(x).to.eql(0);
	});
});