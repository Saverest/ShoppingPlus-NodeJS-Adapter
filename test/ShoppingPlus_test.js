"use strict";

let chai = require("chai");

chai.config.includeStack = true;

const expect = chai.expect;

const ShoppingPlusClient = require("../ShoppingPlusClient");

describe("ShoppingPlusClient", () => {
	context("#constructor", function () {
		it("should instantiate a ShoppingPlusCLient", function (done) {
			const conf = {
				"IdUtente": 715,
				"Login": "wsdemousr",
				"Password": "wsdemopwd",
				"IdServ": 1
			};

			let SPC = new ShoppingPlusClient(conf);

			expect(SPC.getConfiguration()).to.deep.equal(conf);

			done();
		});
	});

	context("#callCardSaldoGet", function () {
		this.timeout(5000);
		it("should return a ShoppingPlusAdapter instance", function (done) {
			let SPC = new ShoppingPlusClient({
				"IdUtente": 715,
				"Login": "wsdemousr",
				"Password": "wsdemopwd",
				"IdServ": 1
			});
			SPC.callCardSaldoGet({IdCard: 1000}, function (err, data) {
				console.log(data);

				expect(err).to.be.null;
				expect(data).to.be.an("object").with.all.keys(["CardSaldoGetResult"]);
				expect(data.CardSaldoGetResult).to.be.an("object").with.all.keys(["stato", "descrizione", "saldo", "datasaldo"]);
				expect(data.CardSaldoGetResult.stato).to.equal("0");
				expect(data.CardSaldoGetResult.saldo).to.equal("150");
				expect(data.CardSaldoGetResult.datasaldo).to.equal("20150107125102");

				done();
			});
		});

	});

	context("#callMovimentoAddSaldo", function () {
		this.timeout(5000);
		it("should return a ShoppingPlusAdapter instance", function (done) {
			let SPC = new ShoppingPlusClient({
				"IdUtente": 715,
				"Login": "wsdemousr",
				"Password": "wsdemopwd",
				"IdServ": 1
			});
			SPC.callMovimentoAddSaldo({
				"IdCampagna": 1,
				"IdTerm": 1,
				"IdCard": 1000,
				"DataMov": 201001011035,
				"IdCausale": "AC",
				"Importo": 50,
				"Rapporto": 100,
				"Numero": "0000000",
				"CodAut": "000000",
				"TipoRec": "MO",
				"IdRevisione": 0
			}, function (err, data) {

				expect(err).to.be.null;
				expect(data).to.be.an("object").with.all.keys(["MovimentoAddSaldoResult"]);
				expect(data.MovimentoAddSaldoResult).to.be.an("object").with.all.keys(["stato", "descrizione", "idtransazione", "idmovimento", "saldor", "saldop", "infoavanzate"]);
				expect(data.MovimentoAddSaldoResult.stato).to.equal("0");
				expect(data.MovimentoAddSaldoResult.saldor).to.equal("300");
				expect(data.MovimentoAddSaldoResult.saldop).to.equal("500");

				done();
			});
		});
	});
});