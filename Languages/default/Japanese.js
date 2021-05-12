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
                	`${message.author} 引数がありません!`,
                	{
                    title : `${cmd.name.replace(/\b\w/g, (l) => l.toUpperCase())}`,
                    description: `> *${cmd.description}*`,
                    fields : [
                        {
                            name: "構文",
                            value:`\`\`\`${cmd.usage}\`\`\``,
                        },
                        {
                            name: "使用例",
                            value:`\`\`\`${cmd.exemple && cmd.exemple.map((x) => `${message.guild.settings.prefix || this.client.config.prefix}${cmd.name} ${x}`).join("\n") || "No examples provided"}\`\`\``,
                        },
                    ],
                 },
                "このbotにコマンドを実行するための権限がたりません",
                "このコマンドを実行する権限がありません",
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
