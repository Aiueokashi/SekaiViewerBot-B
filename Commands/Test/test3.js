const Command = require('../../Structures/Command');

class Test3 extends Command{
  constructor(client){
    super(client,{
      name:'test3',
      
    })
  }

}

module.exports = Test3;