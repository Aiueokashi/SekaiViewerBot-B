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
                	`You didn't provide any arguments, ${message.author} !`,
                	{
                    title : `${cmd.name.replace(/\b\w/g, (l) => l.toUpperCase())}`,
                    description: `> *${cmd.description}*`,
                    fields : [
                        {
                            name: "Syntax",
                            value:`\`\`\`${cmd.usage}\`\`\``,
                        },
                        {
                            name: "Examples use",
                            value:`\`\`\`${cmd.exemple && cmd.exemple.map((x) => `${client.config.prefix}${cmd.name} ${x}`).join("\n") || "No examples provided"}\`\`\``,
                        },
                    ],
                 },
                "I do not have sufficient rights to execute this command.",
                "You lack the required privileges to execute this command.",
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