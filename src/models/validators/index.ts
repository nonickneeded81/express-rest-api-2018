import Message from './message';

interface ValidateConfig {
  [key: string]: {
    msg: string;
    args?: [number, number];
  };
}

class ValidationGenerator {
  name: string;

  config: ValidateConfig;

  constructor(name: string) {
    this.name = name;
    this.config = {};
  }

  notEmpty() {
    this.config.notEmpty = Message.notEmpty(this.name);
    return this;
  }

  len(range: [number, number]) {
    this.config.len = Message.len(this.name, range);
    return this;
  }

  isInt() {
    this.config.isInt = Message.isInt(this.name);
    return this;
  }
}

export const createByName = (name: string) => {
  return new ValidationGenerator(name);
};
