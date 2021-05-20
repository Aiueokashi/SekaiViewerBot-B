const chalk = require("chalk"),
  Command = require("../../Structures/Command");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Evaluate/Execute JavaScript code",
      usage: "eval [...code]",
      args: true,
      category: "Owner",
      cooldown: 0,
      permLevel: 10,
      ownerOnly: true,
    });
  }

  async run(message, [...code]) {
    try {
      let evaled = await eval(code.join(" "));
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 0 });
      if (evaled.includes(this.client.token))
        evaled = evaled.replace(this.client.token, "gm", "*Token*");
      message.channel.send(evaled, { code: "js" });
    } catch (error) {
      let errorDetails = error.toString();

      if (errorDetails.includes(this.client.token))
        errorDetails = errorDetails.replace(this.client.token, "gm", "*Token*");

      message.channel.send(errorDetails, { code: "js" });
    } finally {
      const log = ` USE OF EVAL by ${message.author.username} ( ${message.author.id} )`;

      console.log(chalk.bold.bgRed(`EVAL [${log}]`));
    }
  }
}

module.exports = Eval;
