const Command = require("../../Structures/Command");

class Prefix extends Command {

	constructor(client) {
		super(client, {
			name        : "sekai-prefix",
			description : "Change the prefix used by SekaiViewerBot in the guild",
			usage       : "sekai-prefix [prefix string]",
			exemple     : ["sv!","$"],
			args        : true,
			category    : "Admin",
			cooldown    : 10000,
			aliases     : ["sp"],
			permLevel   : 9,
			userPerms  : "ADMINISTRATOR",
			guildOnly    : true,
		});

	}

	async run(message,[...args]) {
		const client = this.client;
		const oldPrefix = message.guild.settings.prefix;
		if(isNaN(args[0]) && args[0].length < 4){
		const db = client.db.get("guildModel");
	  var target = await db.findOne({
	    guildId: message.guild.id
	  })
	  target.prefix = args[0];
	  await target.save();
	  message.guild.settings.prefix = args[0];
	  const lang = client.language.get(message.guild.settings.local).prefix(args[0],oldPrefix);
	  super.respond({embed: lang[0]})
		}
		
	}
}

module.exports = Prefix;