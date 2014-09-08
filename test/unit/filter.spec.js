/**
 * Filter unit tests
 *
 * @package Playlitics.Filters
 */

describe("Playlitics.Filters.percent", function() {
	beforeEach(function() {
		module("Playlitics.Filters");
	});

	beforeEach(inject(function(percentFilter) {
		this.percent = percentFilter;
	}));

	it("appends % sign to the end of result", function() {
		expect(this.percent(.9888).indexOf("%")).not.toEqual(-1);
	});

	describe("provided a long float", function() {
		it("gives percent to two precision points", function() {
			expect(this.percent(.9998989)).toEqual("99.99%");
		});
	});
});

describe("Playlitics.Filters.duration", function() {
	beforeEach(function() {
		module("Playlitics.Filters");
	});

	beforeEach(inject(function(durationFilter) {
		this.duration = durationFilter;
	}));

	it("should convert seconds to minute:second format", function() {
		expect(this.duration(71)).toEqual("1:11");
	});

	it("should pad seconds if necessary", function() {
		expect(this.duration(65)).toEqual("1:05");
	})
});
