"use strict";

/*** Configuration object
 * @typedef {Object} ShoppingPlusConfiguration
 * @property {number} idUtente                  - UserID
 * @property {string} login                     - Login
 * @property {string} password                  - Password
 * @property {number} idServ                    - IdServ
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
 *
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

ShoppingPlusClient.prototype.callCardSaldoGet = function (idCard, callback) {

	Soap.createClient(url, {
		timeout: options.timeout,
		wsdl_options: {
			ciphers: options.ciphers
		}
	}, function (err, client) {
		if (err) {
			throw err;
		} else {

			let extend = require("util")._extend;

			let args = extend({IdCard: idCard}, _configuration);

			client.CardSaldoGet(args, options, {"SOAPAction": "https://servizi.shoppingplus.it/webservices/spservice/CardSaldoGet"}, function (err, result) {

				if (callback && typeof callback === "function") {
					callback(err, result)
				}
			});
		}
	})
};