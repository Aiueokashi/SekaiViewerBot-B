const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

class Boost extends Command {
  constructor(client) {
    super(client,{
      name: "boost",
      description:
        "Show boost reward per count",
      example: [],
      args: false,
      category: "Sekai",
      cooldown: 10000,
      aliases: [],
      permLevel: 0,
      guildOnly: true,
    });
    
  }
  
  async run(message){
    const BOOSTS = require("../../assets/data/boosts.json");
    const embed = new MessageEmbed().setTitle(`Live boost`);
			BOOSTS.forEach(boost =>
				embed.addField(
					`\`${boost.costBoost}\` Boost`,
					`exp: **×${boost.expRate}** | reward: **×${
						boost.rewardRate
					}** | livePoint: **×${boost.livePointRate}** | eventPoint:  **×${
						boost.eventPointRate
					}** | eventOnly?: ${boost.isEventOnly ? '**Yes**' : '**No**'}`
				)
			);
			embed.setTimestamp();
			return super.respond(embed);
  }
  
}

module.exports = Boost;