const Command = require("../../Structures/Command");
const CardClass = require("../../Structures/Core/Card");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");

class Card extends Command {
  constructor(client) {
    super(client, {
      name: "card",
      description:
        "Search & show cards of Project Sekai\nDefault search language: `en`\n**You can change your language with command : `<<p>>mylanguage`**",
      usage: "card <card prefix | character name>",
      example: ["Distant-Looking, but Friendly", "クールだけど友達想い", "쿨하지만 친구를 생각하는"],
      args: true,
      category: "Sekai",
      cooldown: 10000,
      aliases: [],
      permLevel: 0,
      guildOnly: true,
    });
  }

  async run(message, [...args]) {
    const card = new CardClass(message, {prefix : args[0]});
    
  }
}

module.exports = Card;
