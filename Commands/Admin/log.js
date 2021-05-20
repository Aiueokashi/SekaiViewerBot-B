const Command = require("../../Structures/Command");

class SetLog extends Command {
  constructor(client) {
    super(client, {
      name: "setlog",
      description: "Set logging channel for the guild.",
      usage: "setlog <#channel>",
      example: ["#logchannel","<#1234567890>"],
      args: true,
      category: "Admin",
      cooldown: 10000,
      aliases: ["sl"],
      permLevel: 9,
      userPerms: "ADMINISTRATOR",
      guildOnly: true,
    });
  }

  async run(message, [...args]) {
    const client = this.client;
    const db = client.db.get('guildModel');
    const lang = client.language.get(message.guild.settings.local).setlog()
    let resolve = client.util.resolveChannel(args[0], message.guild.channels.cache, true, true);
      if(resolve === undefined){
        super.respond(lang[0](args[0]));
        return "failed"
      }
    let GuildModel = await db.findOne({
      guildId: message.guild.id,
    });
    if(!GuildModel){
      await message.guild.loadGuild()
      GuildModel = await db.findOne({
        guildId: message.guild.id,
      });
    }
      GuildModel.logChannelId = resolve.id;
      await GuildModel.save();
      return super.respond(lang[1](resolve.id));
  }
}

module.exports = SetLog;
