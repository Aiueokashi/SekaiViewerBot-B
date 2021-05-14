const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js'); 
const axios = require('axios');

class Character extends Command {
	constructor(client) {
		super(client, {
			name: 'character',
			description: 'Change the language used by SekaiViewerBot in the guild',
			usage: 'character <character name>',
			exemple: ['ichika', '一歌','호시노'],
			args: true,
			category: 'Sekai',
			cooldown: 10000,
			aliases: ['chara'],
			permLevel: 0,
			guildOnly: true
		});
	}

	async run(message, [...args]) {
	  const user = message.author;
		const baseURL = this.client.pjAPI.baseURL;
		const lang = this.client.language.get(message.guild.settings.local);
		if(user.isLoaded === false){
		  await user.loadUser()
		}
		const language = user.language;
		const transName = this.client.i18n.get(`${language}|character_name`);
		const transProf = this.client.i18n.get(`${language}|character_profile`);

		if (isNaN(args[0])) {
		  let CHARACTER_ID = null;
		  let count = 0;
	  for (const t of Object.entries(transName)){
	    count++;
	    const c = t[1]
	    if(c.firstName === undefined){
	      c.firstName = "@!$#!%@$%"
	    }
	    if(c.firstName.toLowerCase().match(args) ||c.givenName.toLowerCase().match(args)){
	      CHARACTER_ID = count;
	      break;
	    }
	  }
	  
		} else {
			const CHARACTER_ID = args[0];
			const responce = await axios.get(`${baseURL}/chara?id=${CHARACTER_ID}`);
			const C_DATA = responce.data;
			
		}
	}
}

module.exports = Character;
