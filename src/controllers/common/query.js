import Sequelize from 'sequelize';
import {isObject, isEmpty} from 'lodash';

export const likeQuery = (str) => {
  return {[Sequelize.Op.like]: `%${str}%`};
};

export class WhereBuilder {
  constructor() {
    this.query = {};
  }

  equalQuery(name, q, modifier = (o) => o) {
    if (q == null) return;
    const query = modifier(q);
    this.pushQuery(name, query);
  }

  isNullQuery(name) {
    this.pushQuery(name, null);
  }

  opQuery(name, op, q, modifier = (o) => o) {
    if (q == null) return;
    const query = {};
    query[op] = modifier(q);
    this.pushQuery(name, query);
  }

  likeQuery(name, q, modifier = (o) => o) {
    if (q == null) return;
    const query = modifier(q);
    this.pushQuery(name, likeQuery(query));
  }

  pushQuery(name, query) {
    if (!this.query[name]) {
      this.query[name] = query;
      return;
    }

    if (isObject(this.query[name])) {
      this.query[name] = { ...this.query[name], ...query};
      return;
    }

    if (!Array.isArray(this.query[name])) {
      this.query[name] = [this.query[name]];
    }
    this.query[name].push(query);
  }

  addQuery(query) {
    this.query = { ...this.query, ...query};
  }

  removeQuery(name) {
    delete this.query[name];
  }

  hasWhere() {
    return !isEmpty(this.query);
  }

  generateQuery() {
    return this.query;
  }
}

export const createWhereBuilder = () => {
  return new WhereBuilder();
};
