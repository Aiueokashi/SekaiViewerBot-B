const chalk = require("chalk"),
  fs = require("fs"),
  axios = require("axios");

class Ready {
  constructor(client) {
    this.enable = true;
    this.client = client;
  }

  async run() {
  /*
    let instance = axios.create({
	    baseURL: this.client.pjAPI.baseURL
    });
    let token = process.env.SEKAI_API_TOKEN_BEGIN+'"'+process.env.SEKAI_API_TOKEN_END;
    instance.defaults.headers.common['X-API-TOKEN'] = token;
	var res = await instance.get(`/user/5551199751671810/profile`);
  console.log(res.data)
  */
    
    const client = this.client;
    console.log(chalk.bold.bgBlue("CLIENT [READY]"));
    const guildmanger = client.guilds.cache;
    guildmanger.keyArray().forEach((g, i) => {
      const guild = guildmanger.get(g);
      guild.loadGuild();
    });
    console.event(`[AVAIlABLE COMMANDS]${chalk.bgBlack(": "+this.client.commands.keyArray())}`)
    
    // ----- for debug
    fs.writeFileSync('id.txt',this.client.user.id)
    
    const transCardPref = this.client.i18n.get(`ja|card_prefix`);
    const transCardName = this.client.i18n.get(`ja|card`);
    const CARD_DATAS = require('../assets/data/cards.json');
    const CARD_ID_ARR = new Array();
    
    const prefix = 'あ'
    for(const o of Object.entries(transCardPref)){
      if(o[1].includes(prefix)){
        CARD_ID_ARR.push(o[0]);
      }
    }
    const CARD_DATA = CARD_DATAS.find(c => c.id === parseInt(CARD_ID_ARR[0]));

console.log(client.util.getMax(CARD_DATA))
    /*for (const t in transCardName){
      console.log(t)
    }*/
    
    
  }
}

module.exports = Ready;
