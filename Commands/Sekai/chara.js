const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js'); 
const axios = require('axios');

class Character extends Command {
	constructor(client) {
		super(client, {
			name: 'character',
			description: 'Change the language used by SekaiViewerBot in the guild',
			usage: 'character <character name>',
			exemple: ['ichika', 'ミク'],
			args: true,
			category: 'Sekai',
			cooldown: 10000,
			aliases: ['chara'],
			permLevel: 0,
			guildOnly: true
		});
	}

	async run(message, [...args]) {
		const baseURL = this.client.pjAPI.baseURL;
		const lang = this.client.language.get(this.guild.settings.local);
		const optLang = 'ja'
		const transName = this.client.i18n.get(`${optLang}|character_name`);
		const transProf = this.client.i18n.get(`${optLang}|character_profile`);

		if (isNaN(args[0])) {
		} else {
			const CHARACTER_ID = args[0];
			const responce = await axios.get(`${baseURL}/chara?id=${CHARACTER_ID}`);
			const C_DATA = responce.data;
			
		}
	}
}

module.exports = Character;
