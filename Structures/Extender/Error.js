const ErrMsg = {
  ALIAS_CONFLICT: (alias, id, conflict) => `Alias '${alias}' of '${id}' already exists on '${conflict}'`,
  INVALID_COMMAND_TYPE:(filename) => `${filename} does not correct type of command.`,
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
        return `SekaiError [${this.code}]`;
    }
}

module.exports = SekaiError;