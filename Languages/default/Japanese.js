const chalk = require('chalk'),
	os = require('os');
	
class Language {

    constructor(client) {

        this.client = client;

        this.language = {

            flag  : "🇯🇵",
            local: "Japanese",
            
            message : (message,cmd) =>[
                	'`<<cmd>>`コマンドを使うには`<<time>>`秒待ってください',
              ],
            language: () => [
                "どの国の言葉を使いますか？",
                "日本語に設定しました。",
            ],
        }
    }
    get(term, ...args) {
        const value = this.language[String(term)];
        return typeof value === "function" ? value(...args) : value;
    }
};

module.exports = Language;
