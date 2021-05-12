const chalk = require('chalk'),
	os = require('os');
	
class Language {

    constructor(client) {

        this.client = client;

        this.language = {

            flag  : "🇬🇧",
            local: "English",
            
            message : (message,cmd) =>[
                	'Please wait `<<time>>`second(s) to reuse the `<<cmd>>` command',
              ],
            language: () => [
                "What language do you want to use?",
                "I speak english now !",
            ],
        }
    }
    get(term, ...args) {
        const value = this.language[String(term)];
        return typeof value === "function" ? value(...args) : value;
    }
};

module.exports = Language;