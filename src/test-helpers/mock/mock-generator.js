import {range} from 'lodash';

const modifierFunc = (mo) => {
  if (typeof mo === 'function') return mo;
  return (i, o) => ({ ...o, ...mo});
};

export const removePK = (i, o) => {
  if (o.id === undefined) { return o; }
  const ret = o;
  delete ret.id;
  return ret;
};

export const mergeModifier = (m1, m2) => {
  const f1 = modifierFunc(m1);
  const f2 = modifierFunc(m2);
  return (i, o) => {
    return f2(i, f1(i, o));
  };
};

const buildArgs = (builder, i, modifier) => {
  const f = modifierFunc(modifier);
  return f(i, builder(i));
};

const singleM = (
  builder,
  model,
  i,
  modifier = {},
) => {
  return model.build(buildArgs(builder, i, modifier));
};

const multiM = (
  builder,
  model,
  _range = 5,
  modifier = {},
) => range(_range).map((i) => singleM(builder, model, i, modifier));

const single = (
  builder,
  model,
  i,
  modifier = {},
) => singleM(builder, model, i, modifier)
  .save()
  .catch((err) => console.log(err));

const multi = (
  builder,
  model,
  _range = 5,
  modifier = {},
) => model
  .bulkCreate(range(_range).map((i) => buildArgs(builder, i, modifier)))
  .then(() => model.findAll())
  .catch((err) => console.log(err));

const exportSingleM = (builder, model) => (
  (i = 0, modifier = {}) => singleM(builder, model, i, modifier)
);

const exportMultiM = (builder, model) => (
  // eslint-disable-next-line default-param-last
  (_range = 5, modifier) => multiM(builder, model, _range, modifier)
);

const exportSingle = (builder, model) => (
  (i = 0, modifier = {}) => single(builder, model, i, modifier)
);

const exportMulti = (builder, model) => (
  (_range = 5, modifier = {}) => multi(builder, model, _range, modifier)
);

const exportAll = (builder, model) => {
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
