"use strict";

let chai = require("chai");

chai.config.includeStack = true;

const expect = chai.expect;

const ShoppingPlusClient = require("../ShoppingPlusClient");

const conf = {
	"IdUtente": 715,
	"Login": "wsdemousr",
	"Password": "wsdemopwd",
	"IdServ": 1
};

describe("ShoppingPlusClient", () => {

	describe("Settings", function () {
		context("#constructor", function () {

			it("should return a ShoppingPlusClient", function (done) {
				let SPC = new ShoppingPlusClient(conf);
				expect(SPC).to.be.an("object");
				expect(SPC._configuration).to.deep.equal(conf);
				done();
			});

			it("should throw an error if the options object is invalid", function (done) {
				expect(function () {
					new ShoppingPlusClient(conf, {timeout: -50})
				}).to.throw("Timeout must be a positive integer");
				done();
			});
		});

		context("#getConfiguration", function () {
			let SPC = new ShoppingPlusClient(conf);
			it("should instantiate a ShoppingPlusCLient", function (done) {
				expect(SPC.getConfiguration()).to.deep.equal(conf);
				done();
			});
		});

		context("#setTimeout", function () {
			let SPC = new ShoppingPlusClient(conf);
			const validTimeout = 1000;
			const invalidTimeout = -1000;
			it("should set the timeout if it's a positive number", function (done) {
				expect(SPC.setTimeout(validTimeout)).to.equal(validTimeout);
				done();
			});
			it("should throw an error if the timeout a non positive number", function (done) {
				expect(function () {
					SPC.setTimeout(invalidTimeout);
				}).to.throw("Timeout must be a positive integer");
				done();
			});
		});
	});

	describe("Call to the API", function () {

		context("#callCardSaldoGet", function () {

			this.timeout(5000);

			let SPC = new ShoppingPlusClient(conf);

			it("should call CardSaldoGet and return all the data", function (done) {

				SPC.callCardSaldoGet({IdCard: 1000}, function (err, data) {

					expect(err).to.be.null;
					expect(data).to.be.an("object").with.all.keys(["CardSaldoGetResult"]);
					expect(data.CardSaldoGetResult).to.be.an("object").with.all.keys(["stato", "descrizione", "saldo", "datasaldo"]);
					expect(data.CardSaldoGetResult.stato).to.equal("0");
					expect(data.CardSaldoGetResult.saldo).to.equal("150");
					expect(data.CardSaldoGetResult.datasaldo).to.equal("20150107125102");

					done();
				});
			});

			it("should reuse the same SoapClient if it's already defined", function (done) {

				SPC.callCardSaldoGet({IdCard: 1000}, function (err, data) {
					SPC.callCardSaldoGet({IdCard: 1000}, function (err, data) {
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

			it("should return an error if something goes wrong", function (done) {
				let SPC = new ShoppingPlusClient(conf);
				SPC.setTimeout(1);
				SPC.callCardSaldoGet({IdCard: 1000}, function (err, data) {
					expect(err).to.not.be.null;
					done();
				});
			})

		});

		context("#callMovimentoAddSaldo", function () {

			this.timeout(5000);

			let SPC = new ShoppingPlusClient(conf);


			it("should call MovimentoAddSaldo and return all the data", function (done) {


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

			it("should reuse the same SoapClient if it's already defined", function (done) {

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

		context("#callClienteGet", function () {

			this.timeout(5000);

			let SPC = new ShoppingPlusClient(conf);


			it("should call ClienteGet and return all the data", function (done) {


				SPC.callClienteGet({IdCliente: 1}, function (err, data) {

					expect(err).to.be.null;
					expect(data).to.be.an("object").with.all.keys(["ClienteGetResult"]);
					expect(data.ClienteGetResult).to.be.an("object").with.all.keys(["stato", "daticliente", "descrizione"]);
					expect(data.ClienteGetResult.daticliente).to.be.an("object").with.all.keys(["idrecord", "idcliente", "cognome", "nome", "dataiscrizione", "indirizzo", "cap", "citta", "prov", "nazione", "email", "telefono", "fax", "cell", "cf", "sesso", "statocivile", "professione", "datanascita", "luogonascita", "tipodoc", "numerodoc", "note", "statocliente"]);
					expect(data.ClienteGetResult.stato).to.equal("0");

					done();
				});
			});

			it("should reuse the same SoapClient if it's already defined", function (done) {

				SPC.callClienteGet({IdCliente: 1}, function (err, data) {

					SPC.callClienteGet({IdCliente: 1}, function (err, data) {

						expect(err).to.be.null;
						expect(data).to.be.an("object").with.all.keys(["ClienteGetResult"]);
						expect(data.ClienteGetResult).to.be.an("object").with.all.keys(["stato", "daticliente", "descrizione"]);
						expect(data.ClienteGetResult.daticliente).to.be.an("object").with.all.keys(["idrecord", "idcliente", "cognome", "nome", "dataiscrizione", "indirizzo", "cap", "citta", "prov", "nazione", "email", "telefono", "fax", "cell", "cf", "sesso", "statocivile", "professione", "datanascita", "luogonascita", "tipodoc", "numerodoc", "note", "statocliente"]);
						expect(data.ClienteGetResult.stato).to.equal("0");

						done();
					});
				});
			});
		});

		context("#callCardGet", function () {

			this.timeout(5000);

			let SPC = new ShoppingPlusClient(conf);


			it("should call CardGet and return all the data", function (done) {


				SPC.callCardGet({IdCard: 1000}, function (err, data) {

					console.log(err, data)

					expect(err).to.be.null;
					expect(data).to.be.an("object").with.all.keys(["CardGetResult"]);
					expect(data.CardGetResult).to.be.an("object").with.all.keys(["stato", "daticard", "descrizione"]);
					expect(data.CardGetResult.daticard).to.be.an("object").with.all.keys(["idrecord", "idcard", "idcliente", "dataemissione", "dataritiro", "idgruppocard", "statocard", "blacklist", "password", "idpdv", "qrcode"]);
					expect(data.CardGetResult.stato).to.equal("0");

					done();
				});
			});

			it("should reuse the same SoapClient if it's already defined", function (done) {

				SPC.callCardGet({IdCard: 1000}, function (err, data) {

					SPC.callCardGet({IdCard: 1000}, function (err, data) {

						expect(err).to.be.null;
						expect(data).to.be.an("object").with.all.keys(["CardGetResult"]);
						expect(data.CardGetResult).to.be.an("object").with.all.keys(["stato", "daticard", "descrizione"]);
						expect(data.CardGetResult.daticard).to.be.an("object").with.all.keys(["idrecord", "idcard", "idcliente", "dataemissione", "dataritiro", "idgruppocard", "statocard", "blacklist", "password", "idpdv", "qrcode"]);
						expect(data.CardGetResult.stato).to.equal("0");

						done();
					});
				});
			});
		});
	});
});