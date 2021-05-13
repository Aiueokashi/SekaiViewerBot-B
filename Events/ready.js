const chalk = require('chalk'),
	axios = require('axios');

class Ready {
	constructor(client) {
		this.enable = true;
		this.client = client;
	}

	async run() {
		const client = this.client;
		//lang = client.language.get(client.config.Language || "English").ready();

		console.clear();

		console.log(chalk.bold('ready'));

		if (client.config.Presence) {
			const { status, games, interval } = client.config.Presence;

			games instanceof Array &&
				games.length > 0 &&
				client.user.setPresence({
					status,
					activity: {
						name: games[0].name ? games[0].name : null,
						type: games[0].type ? games[0].type : null,
						url: games[0].url ? games[0].url : null
					}
				});

			games instanceof Array &&
				games.length > 1 &&
				setInterval(() => {
					const index = Math.floor(Math.random() * games.length);
					client.user.setActivity(games[parseInt(index, 10)].name, {
						type: games[parseInt(index, 10)].type,
						url: games[parseInt(index, 10)].url || 'https://www.twitch.tv/'
					});
				}, ((typeof interval === 'number' && interval) || 30) * 1000);
		}
		const guildmanger = client.guilds.cache;
		guildmanger.keyArray().forEach((g, i) => {
			const guild = guildmanger.get(g);
			guild.loadGuild()
			if (guildmanger.keyArray().length - 1 === i) {
				console.log(chalk.bold.green('[LOADED ALL]'));
			}
		});
		
	}
}

module.exports = Ready;
