const { Client, Collection } = require("discord.js"),
  chalk = require("chalk"),
  path = require("path"),
  glob = require("glob"),
  git = require("simple-git"),
  mongoose = require("mongoose"),
  SekaiError = require('./Extender/Error'),
  Command = require("./Command"),
  EmbedToPage = require("./Embed"),
  SekaiUtil = require("./SekaiUtil");

require("./Extender/Guild");
require("./Extender/User");
require("./Http/keepAlive");
require("./Extender/Console");

class Sekai extends Client {
  constructor(options = {}) {
    super(options);

    this.config = require("../config.js");

    this.pjAPI = {
      baseURL: null,
      charaURL: null,
    };

    this.debug = new Array();

    this.i18n = new Collection();

    this.optlang = new Array();

    this.commands = new Collection();

    this.aliases = new Collection();

    this.events = new Collection();

    this.db = new Collection();

    this.language = new Collection();

    this.owners = this.config.Master;
    
    this.util = new SekaiUtil(this);
    
    this.chalk = chalk;

    console.log(chalk.bold.bgRed("CLIENT [INITIALISED]"));
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  loadAssets() {
    const git_difference_url =
      "https://github.com/Sekai-World/sekai-master-db-diff.git";
    const local_path_data = "assets/data";
    git(local_path_data).pull();
    const git_i18n_url = "https://github.com/Sekai-World/sekai-i18n";
    const local_path_i18n = "assets/i18n";
    git(local_path_i18n).pull();
    console.log(chalk.bold.bgGreen("GIT_ASSET [PULLING...]"))
  }

  loadI18n() {
    glob(`./assets/i18n/*`, (err, folders) => {
      folders.forEach((folder) => {
        var [...names] = folder.split("/");
        if (names[3].length < 6 && names[3] !== "CNAME") {
          this.optlang.push(names[3]);
        }
        glob(`./assets/i18n/${names[3]}/*.json`, (err, files) => {
          files.forEach((file) => {
            const filecontent = require(`.${file}`);
            this.i18n.set(
              `${names[3]}|${file.slice(
                file.lastIndexOf("/") + 1,
                file.length - 5
              )}`,
              filecontent
            );
          })
        });
      });
    });
    console.log(chalk.bold.bgBlue(`CLIENT_I18N [LOADING...]`))
  }

  async loadCommands() {
    glob(`${this.directory}/Commands/**/*.js`, (err, files) => {
      if (err) throw new Error(err);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const command = new (require(file))(this),
          filename = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

        if (!(command instanceof Command))
          throw new SekaiError('INVALID_COMMAND_TYPE', filename);
          
          
        let c_conflict = this.commands.get(command.name.toLowerCase());
        if (c_conflict) throw new SekaiError('COMMAND_CONFLICT', command.name, c_conflict.name);
        this.commands.set(command.name, command);

        command.aliases.length &&
          command.aliases.map((alias) => {
            const a_conflict = this.aliases.get(alias.toLowerCase());
            if (a_conflict) throw new SekaiError('ALIAS_CONFLICT', alias, command.name, a_conflict);
            this.aliases.set(alias, command.name)
          });
      }
    });
    console.log(chalk.bold.bgBlue(`CLIENT_COMMAND [REGISTERING...]`))
  }

  loadEvents() {
    glob(`${this.directory}/Events/**/*.js`, (err, files) => {
      if (err) throw new Error(err);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const event = new (require(file))(this),
          eventname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

        if (event.enable) super.on(eventname, (...args) => event.run(...args));
      }
    });
    console.log(chalk.bold.bgBlue(`CLIENT_EVENT [LISTENING]`))
  }

  loadLocal() {
    glob(`${this.directory}/Languages/**/*.js`, (err, files) => {
      if (err) throw new Error(err);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const local = new (require(file))(this),
          localname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);
          
        this.language.set(localname, local.language);
      }
    });
    console.log(chalk.bold.bgBlue("CLIENT_LANGUAGE [LOADING...]"))
  }

  disconnectDatabase() {
    mongoose.disconnect();
    console.log(chalk.bold.bgMagenta("MONGODB [DISCONNECTING...]"))
  }

  async loadDatabase() {
    await require("../assets/connectDB");
    console.log(chalk.bold.bgBlue(`MONGODB [CONNECTING...]`));

    glob(`${this.directory}/Models/*.js`, (err, files) => {
      if (err) throw new Error(err);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const model = require(file),
          modelname = file.slice(file.lastIndexOf("/") + 1, file.length - 3);

        this.db.set(modelname, model);
      }
    });
    console.log(chalk.bold.bgBlue("CLIENT_DB [READY]"));
  }

  async login() {
    await super.login(process.env.SEKAI_TOKEN);
  }

  createPageEmbed(message, pages, paging, trash) {
    EmbedToPage(message, pages, paging, trash);
  }

  setURL() {
    this.pjAPI.baseURL = this.config.apiBaseURL;
    this.pjAPI.charaURL = this.config.characterPhotoURL;
  }

  init() {
    this.loadI18n();
    this.setURL();
    //this.loadAssets();
    this.loadCommands();
    this.loadEvents();
    this.loadLocal();
    this.loadDatabase();
    this.login();
  }

  clearAllCache() {
    this.commands.clear();
    this.aliases.clear();
    this.language.clear();
    this.events.clear();
    this.db.clear();
  }

  loadAll() {
    this.loadCommands();
    this.loadEvents();
    this.loadLocal();
    this.loadDatabase();
  }

  //-------------------
}

module.exports = Sekai;