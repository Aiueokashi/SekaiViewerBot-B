const chalk = require("chalk"),
  os = require("os");

class Language {
  constructor(client) {
    this.client = client;

    this.language = {
      flag: "🇬🇧",
      local: "en",

      message: (message, cmd) => [
        "Please wait `<<time>>`second(s) to reuse the `<<cmd>>` command",
        `You didn't provide any arguments, ${message.author} !`,
        {
          title: `${cmd.name.replace(/\b\w/g, (l) => l.toUpperCase())}`,
          description: `> ${cmd.description.replace(
            "<<p>>",
            message.guild.settings.prefix
          )}`,
          fields: [
            {
              name: "Syntax",
              value: `\`\`\`${cmd.usage}\`\`\``,
            },
            {
              name: "Examples use",
              value: `\`${
                (cmd.example &&
                  cmd.example
                    .map(
                      (x) => `${message.guild.settings.prefix}${cmd.name} ${x}`
                    )
                    .join("\n")) ||
                "No examples provided"
              }\``,
            },
          ],
        },
        "I do not have sufficient rights to execute this command.",
        "You lack the required privileges to execute this command.",
      ],
      language: () => [
        "What language do you want to use?",
        "I speak english now !",
      ],
      chara: () => [
        (args) => `Can't find character: ${args}`,
        (args) => `This character ID does not exsist: ${args}`,
      ],
      mylang: () => [
        "You can't set same language code",
        "Changed user language",
        "new language:",
      ],
      prefix: (prefix, oldPrefix) => [
        {
          title: `Prefix Changed`,
          fields: [
            {
              name: "old prefix",
              value: `\`${oldPrefix}\``,
            },
            {
              name: "new prefix",
              value: `\`${prefix}\``,
            },
          ],
        },
      ],
      reload: () => [
        "Reloaded all json assets.",
        (cmds) => `Reloaded all commands : \`${cmds}\`commands.`,
        "Reloaded all eventHandler.",
        (langs) => `Reloaded language files : \`${langs.length}\`languages.`,
        (models) =>
          `Reloaded all database models : \`${models.length}\`models.`,
        {
          title: `Destroy all cache & reload client extensions : ${client.user.tag}`,
          fields: [
            {
              name: "Commands",
              value: `${client.commands.length} : \`\`\`${client.commands
                .keyArray()
                .toString()}\`\`\``,
            },
            {
              name: "EventHandler",
              value: `${client.events.length} : \`\`\`${client.events
                .keyArray()
                .toString()}\`\`\``,
            },
            {
              name: "DatabaseModels",
              value: `${client.db.length} : \`\`\`${client.db
                .keyArray()
                .toString()}\`\`\``,
            },
            {
              name: "Languages",
              value: `${client.language.length} : \`\`\`${client.language
                .keyArray()
                .toString()}\`\`\``,
            },
          ],
        },
      ],
    };
  }
  get(term, ...args) {
    const value = this.language[String(term)];
    return typeof value === "function" ? value(...args) : value;
  }
}

module.exports = Language;
