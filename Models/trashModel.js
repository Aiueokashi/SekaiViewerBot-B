const { Schema, model } = require("mongoose");

const trashModel = {
  guildId: String,
  channelId: String,
  messageId: String,
};

module.exports = model('trashModel', trashModel);