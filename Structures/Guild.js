const { Structures } = require("discord.js");

Structures.extend("Guild", (Guild) => class extends Guild {

    constructor(client, data) {

        super(client, data);

        this.serverQueue = {
            _queue       : [],
            _oldQueue    : [],
            _connection  : null,
            _dispatcher  : null,
            _isPlaying   : false,
            _volume      : 1,
            _embed       : {},
            _loop        : false,
            _ttl         : [0, 0],
        };
        
        this.textQueue = {
          _volume       : 1,
          _words        : [],
          _oldWords     : [],
          _isReading    : false,
          _embed        : {},
          _connection   : null
        }
        
        
        this.loadGuild = async function() {
          const guildModel = this.client.db.get("guildModel")
        const guildData = await guildModel.findOne({
          guildId : this.id,
        })
        if (!guildData) {
            let newGuildData = new guildModel({
              guildId : this.id,
              local : "English",
              logChannelId : null,
              settings : {
                owner : this.ownerID
              },
            })
            await newGuildData.save()
          }
        }
    }
  //=----------------
});