const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

class MyLanguage extends Command {
  constructor(client) {
    super(client, {
      name: "mylanguage",
      description: "Change your language for search or response data",
      usage: "mylanguage",
      example: [],
      args: false,
      category: "Settings",
      cooldown: 10000,
      aliases: ["myl"],
      permLevel: 0,
      guildOnly: true,
    });
  }

  async run(message, [...args]) {
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
    super.respond(
      new MessageEmbed()
        .setTitle("Chose and send language key")
        .setDescription(this.client.optlang.join(","))
    );
    function filter(message) {
      if (message.author.id !== user.id) {
        return false;
      }
      return this.client.optlang.includes(message);
    }
    const response = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 30000,
      errors: ["time"],
    });
    if (response.size !== 0) {
      const newlang = response.first().content;
      if (newlang === userData.language) {
        return super.respond(lang[0]);
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
    } else {
      super.respond("timeout");
    }
  }
}

module.exports = MyLanguage;
