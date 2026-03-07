import {validationResult} from 'express-validator';
import {SEQUELIZE_UNIQUE_CONSTRAINT_ERROR, SEQUELIZE_VALIDATION_ERROR} from '../constants.js';

const createPaginationResponse = (page, perPage, totalCount) => {
  if (totalCount < perPage) {
    return {
      total_count: totalCount,
      current_page: 1,
      total_page: 1,
    };
  }
  return {
    total_count: totalCount,
    total_page: totalCount % perPage === 0
      ? totalCount / perPage : (Math.floor(totalCount / perPage)) + 1,
    current_page: page,
  };
};

const invalidFormat = (res, status, message = '', errors = {}) => {
  res
    .status(status)
    .send({message, errors});
};

const responseBadRequest = (res, errors = {}) => {
  invalidFormat(res, 400, 'Invalid parameters', errors);
};

const responseNotFound = (res, resourse = '', errors = {}) => {
  const r = resourse ? `${resourse} ` : '';
  invalidFormat(res, 404, `${r}Not Found`, errors);
};

const responseInternalServerError = (
  res,
  errorForLog,
  errors = {},
) => {
  invalidFormat(
    res,
    500,
    'The server encountered an error and was unable to complete your request. Please try again later.',
    errors,
  );
};

const responseJson = (res, json) => {
  res.status(200).send(json);
};

const responseOK = (res) => {
  res.status(200).send({message: 'OK'});
};

const responseCreated = (res, createdId) => {
  res.status(201).send({message: 'OK', id: createdId});
};

const getErrorResponse = (error) => {
  const res = {};
  error.errors.forEach((e) => {
    res[e.path] = e.message;
  });
  return res;
};

const getParameterErrorResponse = (errors) => {
  const res = {};
  errors.forEach((e) => {
    res[e.param] = e.msg;
  });
  return res;
};

const handleSequelizeError = (res, error) => {
  if (
    error.name === SEQUELIZE_VALIDATION_ERROR
    || error.name === SEQUELIZE_UNIQUE_CONSTRAINT_ERROR
  ) {
    responseBadRequest(
      res,
      getErrorResponse(error),
    );
    return true;
  }
  return false;
};

const handleParameterError = (req, res) => {
  const parameterError = validationResult(req);
  if (!parameterError.isEmpty()) {
    responseBadRequest(
      res,
      getParameterErrorResponse(parameterError.array()),
    );
    return true;
  }
  return false;
};

const handleNotUpdated = (
  result,
  res,
) => {
  const notUpdated = () => {
    if (result == null) return false;
    const affectedRow = result[0];
    return affectedRow === 0;
  };
  if (notUpdated()) {
    responseNotFound(res);
    return true;
  }
  return false;
};

export default {
  createPaginationResponse,
  invalidFormat,
  responseBadRequest,
  responseNotFound,
  responseInternalServerError,
  responseOK,
  getParameterErrorResponse,
  handleSequelizeError,
  handleParameterError,
  handleNotUpdated,
  responseCreated,
  responseJson,
};
