const { model, Schema } = require("mongoose");

const guildModel = {
  guildId : String,
  prefix : String,
  local: String,
  logChannelId: String,
  settings: Schema.Types.Mixed,
}

module.exports = model('guildModel', guildModel);