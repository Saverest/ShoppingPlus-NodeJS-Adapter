"use strict";

/*** Configuration object
 * @typedef {object} ShoppingPlusConfiguration
 * @property {number} IdUtente                  - UserID
 * @property {string} Login                     - Login
 * @property {string} Password                  - Password
 * @property {number} IdServ                    - IdServ
 */
/*** Options object
 * @typedef {object} SoapClientOptions
 * @property {number} [timeout]                 - Call timeout in milliseconds, must be positive
 * @property {string} [ciphers]                   - Ciphers used in the connection
 */

// WSDL URL
const url = "https://servizi.shoppingplus.it/webservices/spservice.asmx?wsdl";

let Soap = require("soap");

const defaultOptions = {
	"timeout": 5000,
	"ciphers": "DES-CBC3-SHA"
};

const defaultConfiguration = {};

module.exports = ShoppingPlusClient;

/*** Constructor
 * @constructor {ShoppingPlusClient}
 * @param {ShoppingPlusConfiguration} configuration
 * @param {SoapClientOptions} [options] timeout of each call
 */
function ShoppingPlusClient(configuration, options) {
	this._configuration = {};
	Object.assign(this._configuration, defaultConfiguration);
	Object.assign(this._configuration, configuration);

	if (options && options.timeout && options.timeout <= 0) {
		throw new TypeError("Timeout must be a positive integer");
	}

	this._options = {};
	Object.assign(this._options, defaultOptions);
	Object.assign(this._options, options);
}

/*** Set timeout
 * @param {number} timeout Timeout in milliseconds, must be positive
 */
ShoppingPlusClient.prototype.setTimeout = function (timeout) {
	if (timeout > 0) {
		this._options.timeout = timeout;
		return Number(this._options.timeout);
	} else {
		throw new TypeError("Timeout must be a positive integer");
	}
};

/*** Method to get the client configuration
 * @return {ShoppingPlusConfiguration} configuration
 */
ShoppingPlusClient.prototype.getConfiguration = function () {
	let res = {};
	Object.assign(res, this._configuration);
	return res;
};

/***
 * @callback callCardSaldoGetCallback
 * @param {object} error
 * @param {object} result
 */
/***
 * @typedef {object} callCardSaldoGetArgs
 * @property {number} IdCard IdCard, test: 1000
 * @property {string} [Controllo] Stringa di controllo
 */
/*** CardSaldoGet
 * @param {callCardSaldoGetArgs} args
 * @param {callCardSaldoGetCallback} callback
 */
ShoppingPlusClient.prototype.callCardSaldoGet = function (args, callback) {

	if (!this._soapClient) {
		this._soapClient = Soap.createClientAsync(url, {
			timeout: this._timeout,
			wsdl_options: {
				ciphers: this._options.ciphers
			}
		});
	}

	this._soapClient.then((client) => {

		let content = {};
		Object.assign(content, this._configuration);
		Object.assign(content, args);

		client.CardSaldoGet(content, this._options, {"SOAPAction": "https://servizi.shoppingplus.it/webservices/spservice/CardSaldoGet"}, callback);

	});
};

/***
 * @callback callMovimentoAddSaldoCallback
 * @param {object} error
 * @param {object} result
 */
/***
 * @typedef {object} MovimentoAddSaldoArgs
 * @property {number} IdCampagna    Id campagna, test: 1
 * @property {number} IdTerm        Id terminale, test: 1
 * @property {number} IdCard        Id card, test: 1000
 * @property {number} [DataMov]     Data movimento, test: 201001011035
 * @property {string} IdCausale     Id causale, test: "AC" TODO: definire lista valori
 * @property {number} Importo       Importo, test: 50
 * @property {number} Rapporto      Rapporto di conversione dell'importo, test: 50
 * @property {string} Numero        Numero del movimento, formato "000000", test: "000000"
 * @property {string} CodAut        Codice autorizzativo, formato "000000", test: "000000",
 * @property {string} TipoRec       Tipo di record, formato "AA", test: "MO" TODO: definire lista valori
 * @property {number} IdRevisione   Codice Revisione, vale 0 per non specificarlo, test: 0
 * @property {string} [Controllo] Stringa di controllo
 */
/*** CardSaldoGet
 * @param {MovimentoAddSaldoArgs} args
 * @param {callMovimentoAddSaldoCallback} callback
 */
ShoppingPlusClient.prototype.callMovimentoAddSaldo = function (args, callback) {

	if (!this._soapClient) {
		this._soapClient = Soap.createClientAsync(url, {
			timeout: this._timeout,
			wsdl_options: {
				ciphers: this._options.ciphers
			}
		});
	}

	this._soapClient.then((client) => {

		let content = {};
		Object.assign(content, this._configuration);
		Object.assign(content, args);

		client.MovimentoAddSaldo(content, this._options, {"SOAPAction": "https://servizi.shoppingplus.it/webservices/spservice/MovimentoAddSaldo"}, callback);

	});
};

/***
 * @callback callClienteGetCallback
 * @param {object} error
 * @param {object} result
 */
/***
 * @typedef {object} ClienteGetArgs
 * @property {number} IdCliente IdCliente, test: 1
 * @property {string} [Controllo] Stringa di controllo
 */
/*** CardSaldoGet
 * @param {ClienteGetArgs} args
 * @param {callClienteGetCallback} callback
 */
ShoppingPlusClient.prototype.callClienteGet = function (args, callback) {

	if (!this._soapClient) {
		this._soapClient = Soap.createClientAsync(url, {
			timeout: this._timeout,
			wsdl_options: {
				ciphers: this._options.ciphers
			}
		});
	}

	this._soapClient.then((client) => {

		let content = {};
		Object.assign(content, this._configuration);
		Object.assign(content, args);

		client.ClienteGet(content, this._options, {"SOAPAction": "https://servizi.shoppingplus.it/webservices/spservice/ClienteGet"}, callback);

	});
};