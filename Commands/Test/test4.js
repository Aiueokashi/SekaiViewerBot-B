const Command = require('../../Structures/Command');

class Test4 extends Command{
  constructor(client){
    super(client,{
      name:'test4',
      
    })
  }
}

module.exports = Test4;