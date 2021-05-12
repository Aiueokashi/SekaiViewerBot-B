const { Client, Collection } = require("discord.js")
    , chalk                  = require("chalk")
    , path                   = require("path")
    , glob                   = require("glob")
    , mongoose               = require("mongoose");
    
require("../Structures/Guild");

class Sekai extends Client{
  constructor(options = {}){
    super(options);
      
      this.config = require("../config.js");
      
      this.commands = new Collection();
      
      this.event = new Collection();
      
      this.db = new Collection();
      
      this.language = new Collection();
      
      console.log(chalk.blue("Client initialised..."));
  }
  
  get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}
	
	loadAssets() {
	  
	}
	
	loadCommands() {

        glob(`${this.directory}/Commands/**/*.js`, (err, files) => {

            if (err) throw new Error(err);

            for (const file of files) {

                delete require.cache[[`${file}`]];
                const command = new (require(file))(this),
                      filename = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

                if (!(command instanceof Command))
                    throw new TypeError(`${filename} does not correct type of command.`);

                this.commands.set(command.name, command);

            }
            
        });
    }
    
  loadEvents() {

        glob(`${this.directory}/Events/**/*.js`, (err, files) => {

            if (err) throw new Error(err);

            for (const file of files) {

                delete require.cache[[`${file}`]];
                const event     = new (require(file))(this),
                      eventname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

                if (event.enable)
                    super.on(eventname, (...args) => event.run(...args));

            }
        });
    }
    
  loadLocal() {

        glob(`${this.directory}/Languages/**/*.js`, (err, files) => {

            if (err) throw new Error(err);

            for (const file of files) {

                delete require.cache[[`${file}`]];
                const local     = new (require(file))(this),
                      localname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

                this.language.set(localname, local.language);

            }
        });
    }
    
  async loadDatabase() {
    
    await require("../assets/connectDB")
    console.log(chalk.green(`[MONGODB | CONNECT]`))
    
      glob(`${this.directory}/Models/*.js`, (err, files) => {
        
        if(err) throw new Error(err);
        
        for (const file of files) {

                delete require.cache[[`${file}`]];
                const model     = require(file),
                      modelname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

                this.db.set(modelname, model);

            }
        });
  }
    
  async login() {
    
        await super.login(process.env.SEKAI_TOKEN);
    }

    init() {
        this.loadCommands();
        this.loadEvents();
        this.login();
        this.loadLocal();
        this.loadDatabase();
    }
  
  //-------------------  
}

module.exports = Sekai;