import { range } from 'lodash';
import { ModelStatic, Model } from 'sequelize';

type Builder = (i: number) => Record<string, any>;

export type ModifierFunc = (i: number, o: Record<string, any>) => Record<string, any>;

export type Modifier = Record<string, any> | ModifierFunc;

const modifierFunc = (mo: Modifier): ModifierFunc => {
  if (typeof mo === 'function') return mo as ModifierFunc;
  return (i, o) => ({ ...o, ...mo});
};

export const removePK = (i: number, o: Record<string, any>) => {
  if (o.id === undefined) { return o; }
  const ret = o;
  delete ret.id;
  return ret;
};

export const mergeModifier = (m1: Modifier, m2: Modifier) => {
  const f1 = modifierFunc(m1);
  const f2 = modifierFunc(m2);
  return (i: number, o: Record<string, any>) => {
    return f2(i, f1(i, o));
  };
};

const buildArgs = (builder: Builder, i: number, modifier: Modifier) => {
  const f = modifierFunc(modifier);
  return f(i, builder(i));
};

const singleM = (
  builder: Builder,
  model: ModelStatic<Model>,
  i: number,
  modifier: Modifier = {},
) => {
  return model.build(buildArgs(builder, i, modifier));
};

const multiM = (
  builder: Builder,
  model: ModelStatic<Model>,
  _range = 5,
  modifier: Modifier = {},
) => range(_range).map((i) => singleM(builder, model, i, modifier));

const single = (
  builder: Builder,
  model: ModelStatic<Model>,
  i: number,
  modifier: Modifier = {},
) => singleM(builder, model, i, modifier)
  .save()
  .catch((err: Error) => console.log(err));

const multi = (
  builder: Builder,
  model: ModelStatic<Model>,
  _range = 5,
  modifier: Modifier = {},
) => model
  .bulkCreate(range(_range).map((i) => buildArgs(builder, i, modifier)))
  .then(() => model.findAll())
  .catch((err: Error) => console.log(err));

const exportSingleM = (
  builder: Builder,
  model: ModelStatic<Model>,
) => (i = 0, modifier: Modifier = {}) => singleM(builder, model, i, modifier);

const exportMultiM = (
  builder: Builder,
  model: ModelStatic<Model>,
  // eslint-disable-next-line function-paren-newline
) => (_range = 5, modifier: Modifier = {}) => multiM(builder, model, _range, modifier);

const exportSingle = (
  builder: Builder,
  model: ModelStatic<Model>,
) => (i = 0, modifier: Modifier = {}) => single(builder, model, i, modifier);

const exportMulti = (
  builder: Builder,
  model: ModelStatic<Model>,
  // eslint-disable-next-line function-paren-newline
) => (_range = 5, modifier: Modifier = {}) => multi(builder, model, _range, modifier);

const exportAll = (builder: Builder, model: ModelStatic<Model>) => {
  return {
    single: exportSingle(builder, model),
    multi: exportMulti(builder, model),
    singleM: exportSingleM(builder, model),
    multiM: exportMultiM(builder, model),
  };
};

export default {
  exportAll,
};
