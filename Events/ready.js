const chalk = require("chalk"),
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
    if (client.config.Presence) {
      const { status, games, interval } = client.config.Presence;

      games instanceof Array &&
        games.length > 0 &&
        client.user.setPresence({
          status,
          activity: {
            name: games[0].name ? games[0].name : null,
            type: games[0].type ? games[0].type : null,
            url: games[0].url ? games[0].url : null,
          },
        });

      games instanceof Array &&
        games.length > 1 &&
        setInterval(() => {
          const index = Math.floor(Math.random() * games.length);
          client.user.setActivity(games[parseInt(index, 10)].name, {
            type: games[parseInt(index, 10)].type,
            url: games[parseInt(index, 10)].url || "https://www.twitch.tv/",
          });
        }, ((typeof interval === "number" && interval) || 30) * 1000);
    }
    const guildmanger = client.guilds.cache;
    guildmanger.keyArray().forEach((g, i) => {
      const guild = guildmanger.get(g);
      guild.loadGuild();
    });
    console.event(`[AVAIlABLE COMMANDS]${chalk.bgBlack(": "+this.client.commands.keyArray())}`)
    
    // ----- for debug
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
    for (const t in transCardName){
      console.log(t)
    }
    
    
  }
}

module.exports = Ready;
