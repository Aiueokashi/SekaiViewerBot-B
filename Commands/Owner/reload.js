const chalk = require('chalk'),
	Command = require('../../Structures/Command');

class Reload extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			description: 'Reload assetlist/commands/etc...',
			usage: 'reload <target>',
			example: ['asset','command','event','language','database','destroy'],
			args: true,
			category: 'Owner',
			cooldown: 10000,
			permLevel: 10,
			allowDMs: false,
			ownerOnly: true
		});
	}

	async run(message, [...target]) {
		const lang = this.client.language
			.get(message.guild.settings.local)
			.reload();

		switch (target[0]) {
			case 'asset':
				await this.client.loadAssets();
				super.respond(lang[0]);
				break;

			case 'command':
				const num = this.client.commands.keyArray().length;
				await this.client.commands.clear();
				await this.client.aliases.clear();
				this.client.loadCommands().then(mount => {
					super.respond(lang[1](num));
				});
				break;

			case 'event':
				await this.client.events.clear();
				await this.client.loadEvents();
				super.respond(lang[2]);
				break;

			case 'language':
				await this.client.language.clear();
				await this.client.loadLocal();
				super.respond(lang[3](this.client.language.keyArray()));
				break;

			case 'database':
				await this.client.disconnectDatabase();
				await this.client.loadDatabase();
				super.respond(lang[4](this.client.db));
				break;

			case 'destroy':
				await this.client.clearAllCache();
				await this.client.loadAll();
				super.respond({ embed: lang[5] });
				break;
		}
	}
}

module.exports = Reload;
