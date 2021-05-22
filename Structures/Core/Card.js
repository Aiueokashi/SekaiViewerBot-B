const { MessageEmbed } = require("discord.js"),
  axios = require("axios");
const RATE = {
	1: '<:5_material:800619611330576395>',
	2: '<:5_material:800619611330576395> ×5',
	3: '<:5_material:800619611330576395> ×50',
	4: '<:4_material2:800619591989985311> (<:5_material:800619611330576395>×2000 = <:4_material2:800619591989985311>)'
};
const ATTR = {
	cool: '<:icon_attribute_cool:800616145957945354>',
	cute: '<:icon_attribute_cute:800616146046550027>',
	happy: '<:icon_attribute_happy:800616145916395530>',
	mysterious: '<:icon_attribute_mysterious:800616145954275349>',
	pure: '<:icon_attribute_pure:800616145916919839>'
};
const EMOJI_UNIT = {
  light_sound: "<:unit_ts_1_penlight:800616246651256862>",
  idol: "<:unit_ts_2_penlight:800616246575497226>",
  street: "<:unit_ts_3_penlight:800616246496198746>",
  theme_park: "<:unit_ts_4_penlight:800616246529097748>",
  school_refusal: "<:unit_ts_5_penlight:800616246235627542>",
  piapro: "<:unit_ts_6_penlight:800616246646800394>",
};
const LARGE_EMOJI_UNIT = {
	light_sound: '<:Leo_need:800616285683712040>',
	idol: '<:MORE_MORE_JUMP:800616285729062912>',
	street: '<:Vivid_BAD_SQUAD:800616288644890644>',
	theme_park: '<:WANDERLANDS_SHOWTIME:800616286752997376>',
	school_refusal: '<:NIGHT_CODE:800616285980983297>'
};
const RARELITY = {
	1: '<:rarity_star_normal:800616036910104606>',
	2: '<:rarity_star_normal:800616036910104606><:rarity_star_normal:800616036910104606>',
	3: '<:rarity_star_normal:800616036910104606><:rarity_star_normal:800616036910104606><:rarity_star_normal:800616036910104606>',
	4: '<:rarity_star_normal:800616036910104606><:rarity_star_normal:800616036910104606><:rarity_star_normal:800616036910104606><:rarity_star_normal:800616036910104606>'
};
const TRAINING_RARELITY = {
	1: '<:rarity_star_normal:800616036910104606>',
	2: '<:rarity_star_normal:800616036910104606><:rarity_star_normal:800616036910104606>',
	3: '<:rarity_star_afterTraining:800616092611379200><:rarity_star_afterTraining:800616092611379200><:rarity_star_afterTraining:800616092611379200>',
	4: '<:rarity_star_afterTraining:800616092611379200><:rarity_star_afterTraining:800616092611379200><:rarity_star_afterTraining:800616092611379200><:rarity_star_afterTraining:800616092611379200>'
};

class CardClass {
  constructor(message, options={}){
    this.client = message.client;
    this.message = message;
    
    this.prefix = options.prefix || null;
    this.build = new Object();
  }
  
  async build(){
    const CARD_DATAS = require('../../assets/data/cards.json');
    const CARD_ID = 0;
    const CARD_ID_ARR = new Array();
    const transPref = this.client.i18n.get(`${this.language}|card`);
    const transCardPref = this.client.i18n.get(`${this.language}|card_prefix`);
    const transCardSkil = this.client.i18n.get(`${this.language}|card_skill_name`);
    const transGachaPh = this.client.i18n.get(`${this.language}|card_gacha_phrase`);
    const lang = this.client.language.get(this.message.guild.settings.language).cardBuild();
    
    for(const o of Object.entries(transCardPref)){
      if(o[1].includes(this.prefix)){
        CARD_ID_ARR.push(o[1]);
      }
    }
    let description_arr = new Array();
    CARD_ID_ARR.forEach((c,i) => {
      description_arr.push(`**${i}**:${c}`);
    })
    try{
    let wait_embed = new MessageEmbed();
    wait_embed.setTitle(lang[0])
    .setDescription(description_arr.join('\n'))
    .setColor('GREEN')
    .setTimestamp();
    message.channel.send(wait_embed);
    function filter(message){
      if (message.author.id !== MESSAGE_AUTHOR_ID) {
						return false;
					}
					const pattern = /^[0-9]{1,3}(\s*,\s*[0-9]{1,3})*$/g;
					return pattern.test(message.content);
    }
    message.channel.activeCollector = true;
		const response = await message.channel.awaitMessages(filter, {
			max: 1,
			time: 30000,
			errors: ['time']
		});
		const reply = response.first().content;
		CARD_ID = reply;
    }catch(e){
      message.channel.send(
					new MessageEmbed().setColor('RED').setTitle('タイムアウト')
				);
				message.channel.activeCollector = false;
				return;
    }
    let CARD_DATA = CARD_DATAS.find(c => c.id === parseInt(CARD_ID));
    
    
    
    
  }
  
}

module.exports = CardClass;