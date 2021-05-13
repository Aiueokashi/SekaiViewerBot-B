const Command = require("../../Structures/Command");

class Language extends Command {

	constructor(client) {
		super(client, {
			name        : "language",
			description : "Change the language used by SekaiViewerBot in the guild",
			usage       : "language",
			exemple     : [],
			args        : false,
			category    : "Admin",
			cooldown    : 10000,
			aliases     : ["la"],
			permLevel   : 9,
			userPerms  : "ADMINISTRATOR",
			guildOnly    : true,
		});

	}

	async run(message) {

		const client = this.client;
		const lang = client.language.get(message.guild.settings.local).language();
		
		const selector = await super.respond({ embed : {
			description : lang[0],
		} });

		const flag = client.language.map((x) => selector.react(x.flag) && x.flag);

		const filter = (reaction, user) => flag.includes(reaction.emoji.name) && user.id === message.author.id;
	
		const collected = await selector.awaitReactions(filter, { max: 1, time: 60000 });
	
		const index = flag.indexOf(collected.first().emoji.name);

		message.guild.settings.local = Array.from(client.language.keys())[parseInt(index, 10)];
		const GUILD = await this.client.db.get("guildModel").findOne({
		  guildId : message.guild.id,
		});
		GUILD.local = Array.from(client.language.keys())[parseInt(index, 10)];
		await GUILD.save();
		
		//selector.delete({ reason: "Command completed." });

		super.respond(client.language.get(message.guild.settings.local).language()[1]);

	}
}

module.exports = Language;