const chalk = require("chalk");

class Ready {

    constructor(client) {

        this.enable = true;
        this.client = client;

    }

    async run() {

        const client = this.client;
                //lang = client.language.get(client.config.Language || "English").ready();

        console.clear();

        console.log(chalk.bold("ready"));

        if (client.config.Presence) {

            const { status, games, interval } = client.config.Presence;

            games instanceof Array && games.length > 0 &&
                client.user.setPresence({
                    status,
                    activity: {
                        name: games[0].name ? games[0].name : null,
                        type: games[0].type ? games[0].type : null,
                        url : games[0].url  ? games[0].url  : null,
                    },
                });

            games instanceof Array && games.length > 1 &&
                setInterval(() => {
                    const index = Math.floor(Math.random() * (games.length));
                    client.user.setActivity(games[parseInt(index, 10)].name, {
                        type: games[parseInt(index, 10)].type,
                        url : games[parseInt(index, 10)].url || "https://www.twitch.tv/",
                    });
                }, ((typeof interval === "number" && interval) || 30) * 1000);
        }
        
        client.guilds.cache.keyArray().forEach(g=>{
          const guild = client.guilds.cache.get(g)
          guild.loadGuild()
        });

    }

}

module.exports = Ready;