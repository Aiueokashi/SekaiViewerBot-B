const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Show help of this bot",
      usage: "help <command name(optional)>",
      example: ['en','de','ja'],
      args: false,
      category: "Help",
      cooldown: 10000,
      aliases: [],
      permLevel: 0,
      guildOnly: false,
    });
  }

  async run(message,[...args]) {
    const lang = this.client.language.get(message.guild.settings.local).help()
    if(args[0]){
      
    }else{
      const COMMANDS = this.client.commands.array();
      let Embed_Array = new Array();
      
      function* getPage(pageSize = 1, list) {
				let output = [];
				let index = 0;
				let outputIndex = 0;
				while (index < list.length) {
					output = [];
					for (let i = index; i < index + pageSize; i++) {
						if (list[i]) {
							output.push(list[i]);
						}
					}
					index += pageSize;
					outputIndex++;
					yield [outputIndex, output];
				}
			}
			var page = getPage(10, COMMANDS);
			
			for(const value of page){
			  let help_embed = new MessageEmbed()
			  .setTitle(`${this.client.user.tag} | HELP`)
			  .setDescription(`\`${message.guild.settings.prefix}help ${lang[0]}\`\n${lang[1]}\n\n`)
			  value[1].forEach(
			    v => 
			    v.ownerOnly ? 
			    null :
			    help_embed.addField(`**${message.guild.settings.prefix}${v.name} ${
									v.aliases.length === 0 ? '' : ` | (${v.aliases})`
								}**`,
						`${v.description.replace(/<<p>>/gm,message.guild.settings.prefix)}\n(${
									v.enable === true ?  lang[2] : lang[3]
								})`,
						true)
			    )
			    help_embed.setTimestamp();
				  Embed_Array.push(help_embed);
			}
			
			this.client.createPageEmbed(message, Embed_Array, true, true);
			
			return 1;
      
    }
  }
}

module.exports = Help;
