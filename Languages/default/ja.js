const chalk = require("chalk"),
  os = require("os");

class Language {
  constructor(client) {
    this.client = client;

    this.language = {
      flag: "ð¯ðµ",
      local: "ja",

      message: (message, cmd) => [
        "`<<cmd>>`ã³ãã³ããä½¿ãã«ã¯`<<time>>`ç§å¾ã£ã¦ãã ãã",
        `${message.author} å¼æ°ãããã¾ãã!`,
        {
          title: `${cmd.name.replace(/\b\w/g, (l) => l.toUpperCase())}`,
          description: `> ${cmd.description}`,
          fields: [
            {
              name: "æ§æ",
              value: `\`\`\`${cmd.usage}\`\`\``,
            },
            {
              name: "ä½¿ç¨ä¾",
              value: `\`\`\`${
                (cmd.exemple &&
                  cmd.exemple
                    .map(
                      (x) =>
                        `${
                          message.guild.settings.prefix ||
                          this.client.config.prefix
                        }${cmd.name} ${x}`
                    )
                    .join("\n")) ||
                "No examples provided"
              }\`\`\``,
            },
          ],
        },
        "ãã®botã«ã³ãã³ããå®è¡ããããã®æ¨©éãããã¾ãã",
        "ãã®ã³ãã³ããå®è¡ããæ¨©éãããã¾ãã",
      ],
      help: () => [
        "[ã³ãã³ãå]",
        "ãä½¿ãã¨è©³ç´°ãè¦ããã¨ãã§ãã¾ã",
        "å©ç¨å¯è½",
        "ã¡ã³ããã³ã¹ä¸­",
        ],
      mylang: () => [
        "åãè¨èªãè¨­å®ãããã¨ã¯ã§ãã¾ããã",
        "ã¦ã¼ã¶ã¼è¨èªãå¤æ´ããã¾ããã",
        "è¨­å®ããè¨èª:",
        "æ­£ãããªãå½¢å¼ã§ã",
      ],
      chara: () => [
        (args) => `ã­ã£ã©ã¯ã¿ã¼ãè¦ã¤ãããã¨ãã§ãã¾ããã§ãã: ${args}`,
        (args) => `ãã®IDã®ã­ã£ã©ã¯ã¿ã¼IDã¯å²ãå½ã¦ããã¦ãã¾ãã: ${args}`,
        (lang) => `ãã®è¨èªã«ã¯ã¾ã ç¿»è¨³ããã¦ãã¾ãã: ${lang}`
      ],
      language: () => ["ã©ã®å½ã®è¨èãä½¿ãã¾ããï¼", "æ¥æ¬èªã«è¨­å®ãã¾ããã"],
      setlog: () => [
        (args) => `ãã£ã³ãã«ãè¦ã¤ãããã¨ãã§ãã¾ããã§ãã: ${args}`,
        (channelId) => `ã­ã°ãã£ã³ãã«ãè¨­å®ãã¾ãã: <#${channelId}>`
        ],
      prefix: (prefix, oldPrefix) => [
        {
          title: `Prefixãå¤æ´ããã¾ããã`,
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
        'æ­£ãããªãå½¢å¼ã§ã'
      ],
      reload: () => [
        "jsonãã¡ã¤ã«ãåèª­ã¿è¾¼ã¿ãã¾ããã",
        (cmds) => `\`${cmds}\`åã®ã³ãã³ããåèª­ã¿è¾¼ã¿ãã¾ããã`,
        "ã¤ãã³ããã³ãã©ãåèª­ã¿è¾¼ã¿ãã¾ããã",
        (langs) => `\`${langs.length}\`åã®è¨èªãã¡ã¤ã«ãåèª­ã¿è¾¼ã¿ãã¾ããã`,
        (models) =>
          `\`${models.length}\`åã®ãã¼ã¿ã¹ã­ã¼ããåèª­ã¿è¾¼ã¿ãã¾ããã`,
        {
          title: `æ¡å¼µæ©è½ã®ã­ã£ãã·ã¥ãå¨ã¦ç ´æ£ãã¾ããã: ${client.user.tag}`,
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
