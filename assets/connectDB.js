const mongoose = require("mongoose");
(async function(){
await mongoose.connect(
		process.env.MONGO_DB_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true
		}
	);
})();
	
module.exports = mongoose;