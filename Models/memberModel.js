const { model, Schema } = require("mongoose");

const memberModel = {
  guildId : String,
  memberId : String,
  settings : Schema.Types.Mixed,
  stats : Schema.Types.Mixed,
}

module.exports = model('memberModel', memberModel);