"use strict";

let chai = require("chai");

chai.config.includeStack = true;

const expect = chai.expect;

const ShoppingPlusClient = require("../ShoppingPlusClient");

describe("ShoppingPlusClient", () => {
	context("#constructor", function () {
		this.timeout(5000);

		it("should return a ShoppingPlusAdapter instance", function (done) {

			let SPC = new ShoppingPlusClient({
				"IdUtente": 715,
				"Login": "wsdemousr",
				"Password": "wsdemopwd",
				"IdServ": 1
			});

			SPC.callCardSaldoGet(1000, function (err, data) {

				console.error(err);
				console.log(data);

				done();
			})


		});

	});
});