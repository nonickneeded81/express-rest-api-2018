import Message from './message.js';

class ValidationGenerator {
  constructor(name) {
    this.name = name;
    this.config = {};
  }

  notEmpty() {
    this.config.notEmpty = Message.notEmpty(this.name);
    return this;
  }

  len(range) {
    this.config.len = Message.len(this.name, range);
    return this;
  }

  isInt() {
    this.config.isInt = Message.isInt(this.name);
    return this;
  }
}

export const createByName = (name) => {
  return new ValidationGenerator(name);
};
