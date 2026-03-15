// @flow
import {checkSchema} from 'express-validator';

const request = {
  title: {
    errorMessage: 'Title is required.',
    notEmpty: true,
  },
  body: {
    errorMessage: 'Body is required.',
    notEmpty: true,
  },
};

const id = {
  id: {
    errorMessage: 'ID must be numeric.',
    isInt: true,
  },
};

const create = checkSchema(request);

const update = checkSchema({
  ...request,
  ...id,
});

const detail = checkSchema(id);

const index = checkSchema({
  page: {
    errorMessage: 'Page must be numeric.',
    optional: true,
    isInt: true,
    toInt: true,
  },
  per_page: {
    errorMessage: 'Per-page must be numeric.',
    optional: true,
    isInt: true,
    toInt: true,
  },
  order_key: {
    errorMessage: 'Invalid Order-key.',
    optional: true,
    isIn: {
      options: [['title', 'body']],
    },
  },
  order: {
    errorMessage: 'Invalid Order.',
    optional: true,
    isIn: {
      options: [['desc', 'asc']],
    },
  },
});

export default {
  create,
  update,
  detail,
  index,
};
