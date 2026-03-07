import { Op, WhereAttributeHashValue } from 'sequelize';
import { isObject, isEmpty } from 'lodash';

export const likeQuery = (str: string): WhereAttributeHashValue<any> => {
  return { [Op.like]: `%${str}%` };
};

export class WhereBuilder {
  query: Record<string, any>;

  constructor() {
    this.query = {};
  }

  equalQuery(name: string, q: any, modifier: (q: any) => any = (o) => o) {
    if (q == null) return;
    const query = modifier(q);
    this.pushQuery(name, query);
  }

  isNullQuery(name: string) {
    this.pushQuery(name, null);
  }

  opQuery(name: string, op: symbol, q: any, modifier: (q: any) => any = (o) => o) {
    if (q == null) return;
    const query: Record<string | symbol, any> = {};
    query[op] = modifier(q);
    this.pushQuery(name, query);
  }

  likeQuery(name: string, q: string, modifier: (q: any) => any = (o) => o) {
    if (q == null) return;
    const query = modifier(q);
    this.pushQuery(name, likeQuery(query));
  }

  pushQuery(name: string, query: any) {
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

  addQuery(query: Record<string, any>) {
    this.query = { ...this.query, ...query};
  }

  removeQuery(name: string) {
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
