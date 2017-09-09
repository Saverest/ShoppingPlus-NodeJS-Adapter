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
/*** CardSaldoGet
 * @param args
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
/*** CardSaldoGet
 * @param args
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