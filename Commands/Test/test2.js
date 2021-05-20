const Command = require('../../Structures/Command');

class Test2 extends Command{
  constructor(client){
    super(client,{
      name:'test2',
      
    })
  }

}

module.exports = Test2;