const { model, Schema } = require("mongoose");

const userModel = {
  userId : String,
  language: String,
  settings : Schema.Types.Mixed,
  stats : Schema.Types.Mixed,
  data : Schema.Types.Mixed,
}

module.exports = model('userModel', userModel);