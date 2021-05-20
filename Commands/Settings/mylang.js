const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

class MyLanguage extends Command {
  constructor(client) {
    super(client, {
      name: "mylanguage",
      description: "Change your language for search or response data",
      usage: "mylanguage <language flag>",
      example: ['en','de','ja'],
      args: true,
      category: "Settings",
      cooldown: 10000,
      aliases: ["myl"],
      permLevel: 0,
      guildOnly: true,
    });
  }

  async run(message,[...args]) {
    let _already = false;
    const user = this.client.users.cache.get(message.author.id);
    const lang = this.client.language
      .get(message.guild.settings.local)
      .mylang();
    await user.loadUser(user.id);
    let userData = await this.client.db.get("userModel").findOne({
      userId: user.id,
    });
    if (!userData) {
      user.language = "en";
      user.createUser();
    } else {
      user.language = userData.language;
      _already = true;
    }
    const language = user.language;
      const newlang = args[0];
      if(!this.client.optlang.includes(newlang)){
        super.respond(`${lang[3]} :\n${this.client.optlang.join(',')}`);
        return 'failed';
      }
      if (newlang === userData.language) {
        super.respond(lang[0]);
        return 'failed';
      }
      if (_already) {
        userData.language = newlang;
        user.language = newlang;
        await userData.save();
      } else {
        userData = await this.client.db.get("userModel").findOne({
          userId: user.id,
        });
        userData.language = newlang;
        user.language = newlang;
        await userData.save();
      }
      super.respond(
        new MessageEmbed().setTitle(lang[1]).addField(lang[2], newlang)
      );
      return 1;
  }
}

module.exports = MyLanguage;
