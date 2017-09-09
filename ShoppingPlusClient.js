"use strict";

/*** Configuration object
 * @typedef {object} ShoppingPlusConfiguration
 * @property {number} IdUtente                  - UserID
 * @property {string} Login                     - Login
 * @property {string} Password                  - Password
 * @property {number} IdServ                    - IdServ
 */

// WSDL URL
const url = "https://servizi.shoppingplus.it/webservices/spservice.asmx?wsdl";

let Soap = require("soap");

let options = {
	"timeout": 5000,
	"ciphers": "DES-CBC3-SHA"
};
let _configuration = {};

module.exports = ShoppingPlusClient;

/*** Constructor
 *
 * @param {ShoppingPlusConfiguration} configuration
 * @constructor
 */
function ShoppingPlusClient(configuration) {
	_configuration = configuration;
}

/*** Set timeout
 * @param {number} timeout Timeout in milliseconds, must be positive
 */
ShoppingPlusClient.prototype.setTimeout = function (timeout) {
	if (timeout > 0) {
		options.timeout = timeout;
	} else {
		throw {
			error: "Negative timeout",
			message: "Timeout must be positive",
			value: timeout
		}
	}
};

/*** Method to get the client configuration
 * @return {ShoppingPlusConfiguration} configuration
 */
ShoppingPlusClient.prototype.getConfiguration = function () {
	let res = {};
	Object.assign(res, _configuration);
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

	Soap.createClient(url,
		{
			timeout: options.timeout,
			wsdl_options: {
				ciphers: options.ciphers
			}
		},
		function (err, client) {
			if (err) {
				throw err;
			} else {

				let content = {};
				Object.assign(content, _configuration);
				Object.assign(content, args);

				client.CardSaldoGet(
					content,
					options,
					{
						"SOAPAction": "https://servizi.shoppingplus.it/webservices/spservice/CardSaldoGet"
					},
					function (err, result) {
						if (callback && typeof callback === "function") {
							callback(err, result)
						}
					}
				);
			}
		}
	);
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
	Soap.createClient(url,
		{
			timeout: options.timeout,
			wsdl_options: {
				ciphers: options.ciphers
			}
		},
		function (err, client) {
			if (err) {
				throw err;
			} else {

				let content = {};
				Object.assign(content, _configuration);
				Object.assign(content, args);

				client.MovimentoAddSaldo(
					content,
					options,
					{
						"SOAPAction": "https://servizi.shoppingplus.it/webservices/spservice/MovimentoAddSaldo"
					},
					function (err, result) {
						if (callback && typeof callback === "function") {
							callback(err, result)
						}
					}
				);
			}
		}
	);
};