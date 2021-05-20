const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const EMOJI_UNIT = {
  light_sound: "<:unit_ts_1_penlight:800616246651256862>",
  idol: "<:unit_ts_2_penlight:800616246575497226>",
  street: "<:unit_ts_3_penlight:800616246496198746>",
  theme_park: "<:unit_ts_4_penlight:800616246529097748>",
  school_refusal: "<:unit_ts_5_penlight:800616246235627542>",
  piapro: "<:unit_ts_6_penlight:800616246646800394>",
};

class Character extends Command {
  constructor(client) {
    super(client, {
      name: "character",
      description:
        "Search & show characters of Project Sekai\nDefault search language: `en`\n**You can change your language with command : `<<p>>language`**",
      usage: "character <character name>",
      example: ["ichika", "一歌", "호시노"],
      args: true,
      category: "Sekai",
      cooldown: 10000,
      aliases: ["chara"],
      permLevel: 0,
      guildOnly: true,
    });
  }

  async run(message, [...args]) {
    const user = this.client.users.cache.get(message.author.id);
    const lang = this.client.language.get(message.guild.settings.local).chara();
    let _notChanged = true;
    await user.loadUser(user.id);
    let userData = await this.client.db.get("userModel").findOne({
      userId: user.id,
    });
    if (!userData) {
      user.language = "en";
      user.createUser();
    } else {
      user.language = userData.language;
    }
    const language = user.language;
    let transName = this.client.i18n.get(`${language}|character_name`);
    let transProf = this.client.i18n.get(`${language}|character_profile`);
    let transUnit = this.client.i18n.get(`${language}|unit_profile`);
    let transTitle = this.client.i18n.get(`${language}|member`);
    
    if(transName === undefined){
      transName = this.client.i18n.get(`en|character_name`);
      _notChanged = false;
    }
    if(transProf === undefined){
      transProf = this.client.i18n.get(`en|character_profile`);
      transUnit = this.client.i18n.get(`en|unit_profile`);
      transTitle = this.client.i18n.get(`en|member`);
      _notChanged = false;
    }

    let CHARACTER_ID = -1;
    if (isNaN(args[0])) {
      let count = 0;
      for (const t of Object.entries(transName)) {
        count++;
        const c = t[1];
        if (c.firstName === undefined) {
          c.firstName = "@!$#!%@$%";
        }
        if (
          c.firstName.toLowerCase().match(args) ||
          c.givenName.toLowerCase().match(args)
        ) {
          CHARACTER_ID = count;
          break;
        }
      }
      if (CHARACTER_ID === -1) {
        super.respond(lang[0](args[0]));
        return 'failed';
      }
    } else {
      CHARACTER_ID = args[0];
    }

    const json = require("../../assets/data/gameCharacterUnits.json");
    const data = json.find((j) => j.gameCharacterId === CHARACTER_ID);
    if (data === undefined) {
      super.respond(lang[1](args[0]));
      return 'failed';
    }

    let chara_embed = new MessageEmbed()
      .setColor(data.colorCode)
      .setThumbnail(
        this.client.pjAPI.charaURL.replace("<<characterId>>", CHARACTER_ID)
      )
      .setTitle(
        `${EMOJI_UNIT[data.unit]} | ${
          transName[CHARACTER_ID].firstName === undefined
            ? ""
            : transName[CHARACTER_ID].givenName
        }`
      )
      .setDescription(
        `${transTitle.introduction} : ${transProf[CHARACTER_ID].introduction}`
      );
    const p = transProf[CHARACTER_ID];
    for (const t in p) {
      if (t === "introduction") {
        continue;
      } else {
        chara_embed.addField(transTitle[t], p[t]);
      }
    }
    _notChanged ? null : chara_embed.setFooter(lang[2](language));
    return super.respond(chara_embed);
  }
}

module.exports = Character;
