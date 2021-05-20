const Command = require('../../Structures/Command');

class Test1 extends Command{
  constructor(client){
    super(client,{
      name:'test1',
      
    })
  }
}

module.exports = Test1;