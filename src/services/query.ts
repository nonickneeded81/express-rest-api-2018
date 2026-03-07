import { Request } from 'express';
import { Order } from 'sequelize';

const createPaginationQuery = (req: Request) => {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PER_PAGE = 20;
  const page = req.query.page ? Number(req.query.page) : DEFAULT_PAGE;
  const perPage = req.query.per_page ? Number(req.query.per_page) : DEFAULT_PER_PAGE;
  return {
    page,
    perPage,
    offset: (page - 1) * perPage,
    limit: perPage,
  };
};

const addUniqueColumnToFinalOrderKey = (orderKeys: [string, string][]) => {
  if (!orderKeys.some((key) => { return key[0] === 'id'; })) orderKeys.push(['id', 'desc']);
  return orderKeys;
};

const createOrderQueryByParam = (orderKey: string, order: string): Order => {
  const DEFAULT_ORDER_KEY = 'id';
  const DEFAULT_ORDER = 'desc';
  return addUniqueColumnToFinalOrderKey([[
    orderKey || DEFAULT_ORDER_KEY,
    order || DEFAULT_ORDER,
  ]]) as Order;
};

const createOrderQueryForAssociation = (
  model: any | Array<any>,
  orderKey: string,
  order: string,
) => {
  const models = Array.isArray(model) ? model : [model];
  const base = createOrderQueryByParam(orderKey, order) as [string, string][];
  const query = base.map((q) => [...models, ...q]) as [string, string][];
  return addUniqueColumnToFinalOrderKey(query);
};

const createOrderQuery = (req: Request): Order => {
  return createOrderQueryByParam(
    req.query.order_key as string,
    req.query.order as string,
  );
};

export default {
  createOrderQuery,
  createOrderQueryForAssociation,
  createPaginationQuery,
};
