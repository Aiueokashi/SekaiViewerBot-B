const chalk = require("chalk")
    , Command = require("../../Structures/Command");

class Reload extends Command {

    constructor(client) {
        super(client, {
            name        : "reload",
            description : "Reload assetlist/commands/etc...",
            usage       : "reload [target]",
            args        : true,
            category    : "Owner",
            cooldown    : 100000,
            permLevel   : 10,
            allowDMs    : false,
            ownerOnly   : true,
        });
    }

    async run(message, [...target]) {
      switch(target[0]){
        case "asset":
          this.client.loadAssets();
        break;
        
        case "command":
          this.client.commands.clear();
          this.client.aliases.clear();
          this.client.loadCommands();
        break;
        
        case "event":
          this.client.events.clear();
          this.client.loadEvents();
        break;
        
        case "language":
          this.client.language.clear();
          this.client.loadLocal();
        break;
        
        case "database":
          this.client.disconnectDatabase();
          this.client.loadDatabase();
        break;
          
      }

    }
}

module.exports = Reload;