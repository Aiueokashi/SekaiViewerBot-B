const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

class Message {
	constructor(client) {
		this.enable = true;
		this.client = client;
	}

	async run(message) {
		const client = this.client;

		if (message.author.bot || message.system) return;

		if (!message.member && message.guild)
			message.member = await message.guild.members.fetch(message.author);

		const prefixRegex = new RegExp(
			`^(<@!?${message.client.user.id}>|${escapeRegex(
				message.guild.settings.prefix
			)})`
		);
		if (!prefixRegex.test(message.content)) return;
		const [, matchedPrefix] = message.content.match(prefixRegex);
		let content = message.content
			.slice(matchedPrefix.length)
			.split(/[\s]+/gm);
		
		if(content[0] === ""){
    	let trash = content.shift()
    }
    const [commandPrefix, ...args] = content

		const command =
			client.commands.get(commandPrefix.toLowerCase()) ||
			client.commands.get(client.aliases.get(commandPrefix.toLowerCase()));

		if (!command) return;
		const lang = client.language
			.get((message.guild && message.guild.settings.local) || 'English')
			.message(message, command);
		if (command.cmdCooldown.has(message.author.id))
			return (
				message.delete({ timeout: 10000 }) &&
				message
					.reply(
						lang[0]
							.replace(
								/<<time>>/gm,
								command.cmdCooldown.get(message.author.id) / 1000
							)
							.replace(/<<cmd>>/gm, command.name)
					)
					.then(msg => msg.delete({ timeout: 10000 }))
			);

		if (command.ownerOnly && !client.owners.includes(message.author.id)) return;

		if (command.guildOnly && !message.guild) return;

		if (command.nsfw && !message.channel.nsfw) return;

		if (command.args && !args.length)
			return message.channel.send(
				!command.usage || '' ? lang[1] : { embed: lang[2] }
			);

		if (message.guild && !client.owners.includes(message.author.id)) {
			const userPerms = message.channel
				.permissionsFor(message.member)
				.missing(command.userPerms);

			if (userPerms.length) return message.reply(lang[3]);

			const botPerms = message.channel
				.permissionsFor(client.user)
				.missing(command.botPerms);

			if (botPerms.length) return message.reply(lang[4]);
		}

		command.setMessage(message);

		command.run(message, args);

		if (command.cooldown > 0) command.startCooldown(message.author.id);
	}
}

module.exports = Message;
