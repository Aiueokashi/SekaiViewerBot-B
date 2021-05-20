class ChannelCreate {
  constructor(client) {
    this.enable = true;
    this.client = client;
  }

  async run(channel) {
    console.event(`EVENT [CHANNEL_CREATE | ${channel.name} (${channel.guild ? channel.guild.name : "DMchannel"})]`);
  }
}

module.exports = ChannelCreate;
