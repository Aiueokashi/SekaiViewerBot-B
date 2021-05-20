const chalk = require('chalk');
chalk.err = chalk.bold.red;
const ErrMsg = {
  ALIAS_CONFLICT: (alias, id, conflict) => `Alias '${chalk.err(alias)}' of '${chalk.err(id)}' already exists on '${chalk.err(conflict)}'`,
  INVALID_COMMAND_TYPE:(filename) => `${chalk.err(filename)} does not correct type of command.`,
  COMMAND_CONFLICT: (command, conflict) => `Command '${chalk.err(command)}' already exists on '${chalk.err(conflict)}'`,
  NOT_PROVIDE_RUN_METHOD: (name) => `Command '${name}' doesn't provide a run method!`,
};

class SekaiError extends Error {
  constructor(key,...args){
    if (ErrMsg[key] == null) throw new TypeError(`Error key '${key}' does not exist`);
        const message = typeof ErrMsg[key] === 'function'
            ? ErrMsg[key](...args)
            : ErrMsg[key];

        super(message);
        this.code = key;
  }
  
  get name() {
        return chalk.bold.bgRed(`SekaiError [${this.code}]`);
    }
}

module.exports = SekaiError;