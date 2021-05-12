const { Permissions } = require('discord.js');

class Command {
	constructor(client, options = {}) {
		this.client = client;

		this.name = options.name || null;
		this.aliases = options.aliases || [];
		this.description = options.description || 'No information specified.';
		this.category = options.category || 'General';
		this.args = options.args || false;
		this.usage = options.usage || null;
		this.cooldown = options.cooldown || 1000;

		this.userPerms = new Permissions(
			options.userPerms || 'SEND_MESSAGES'
		).freeze();
		this.botPerms = new Permissions(
			options.botPerms || 'SEND_MESSAGES'
		).freeze();
		this.guildOnly = options.guildOnly || false;
		this.ownerOnly = options.ownerOnly || false;
		this.nsfw = options.nsfw || false;

		this.cmdCooldown = new Map();
	}

	async run() {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

	startCooldown(user) {
		this.cmdCooldown.set(user, this.cooldown);

		setTimeout(() => {
			this.cmdCooldown.delete(user);
		}, this.cooldown);
	}

	setMessage(message) {
		this.message = message;
	}

	respond(message) {
		return this.message.channel.send(message);
	}
}

module.exports = Command;
