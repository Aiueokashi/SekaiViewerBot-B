const { Structures } = require('discord.js');

Structures.extend(
	'User',
	User =>
		class extends User {
			constructor(client, data) {
				super(client, data);
				
				this.isLoaded = false;
				
				this.language = null;
				
				this.settings = null;
			
		  this.loadUser = async function() {
				  const userModel = this.client.db.get('userModel');
				  let USER = await userModel.findOne({
				    userId:this.id,
				  });
				  if(!USER){
				    this.isLoaded = true;
				    this.language = 'en';
				  }else{
				    this.isLoaded = true;
				    this.settings = USER;
				    this.language = USER.language;
				  }
				}
		this.createUser = async function() {
			  const userModel = this.client.db.get('userModel');
			  let USER = await userModel.findOne({
				    userId:this.id,
				  });
				  if(!USER){
				    let NewUser = new userModel({
				      userId:this.id,
				      language:'en',
				      settings:null,
				      stats:null,
				    })
				    await NewUser.save();
				    this.isLoaded = true;
				    this.settings = NewUser;
				    this.language = NewUser.language;
				  }
			}
			}
		}
);
