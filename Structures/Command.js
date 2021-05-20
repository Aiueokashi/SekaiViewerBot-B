const { Permissions } = require("discord.js"),
      SekaiError = require("./Extender/Error");

class Command {
  constructor(client, options = {}) {
    this.client = client;

    this.name = options.name || null;
    this.aliases = options.aliases || [];
    this.description = options.description || "No information specified.";
    this.example = options.example || [];
    this.category = options.category || "General";
    this.args = options.args || false;
    this.usage = options.usage || null;
    this.cooldown = options.cooldown || 1000;
    this.enable = options.enable || true;

    this.userPerms = new Permissions(
      options.userPerms || "SEND_MESSAGES"
    ).freeze();
    this.botPerms = new Permissions(
      options.botPerms || "SEND_MESSAGES"
    ).freeze();
    this.guildOnly = options.guildOnly || false;
    this.ownerOnly = options.ownerOnly || false;
    this.nsfw = options.nsfw || false;

    this.cmdCooldown = new Map();
  }

  async run() {
    const err = new SekaiError('NOT_PROVIDE_RUN_METHOD', this.name);
    this.message.channel.send({embed : { title : err.code, description: err.message }});
    throw err;
  }

  startCooldown(user) {
    this.cmdCooldown.set(user, this.cooldown);

    setTimeout(() => {
      this.cmdCooldown.delete(user);
    }, this.cooldown);
  }

  setMessage(message) {
    this.message = message;
  }

  respond(message) {
    return this.message.channel.send(message);
  }
}

module.exports = Command;
