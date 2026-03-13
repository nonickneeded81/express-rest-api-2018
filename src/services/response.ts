import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { SEQUELIZE_UNIQUE_CONSTRAINT_ERROR, SEQUELIZE_VALIDATION_ERROR } from '../constants';

const createPaginationResponse = (page: number, perPage: number, totalCount: number) => {
  if (totalCount < perPage) {
    return {
      total_count: totalCount,
      current_page: 1,
      total_page: 1,
    };
  }
  return {
    total_count: totalCount,
    total_page: totalCount % perPage === 0 ?
      totalCount / perPage : (Math.floor(totalCount / perPage)) + 1,
    current_page: page,
  };
};

const invalidFormat = (res: Response, status: number, message: string = '', errors: Record<string, any> = {}) => {
  res
    .status(status)
    .send({ message, errors });
};

const responseBadRequest = (res: Response, errors: Record<string, any> = {}) => {
  invalidFormat(res, 400, 'Invalid parameters', errors);
};

const responseNotFound = (res: Response, resource: string = '', errors: Record<string, any> = {}) => {
  const r = resource ? `${resource} ` : '';
  invalidFormat(res, 404, `${r}Not Found`, errors);
};

const responseInternalServerError = (
  res: Response,
  _errorForLog: any,
  errors: Record<string, any> = {},
) => {
  invalidFormat(
    res,
    500,
    'The server encountered an error and was unable to complete your request. Please try again later.',
    errors,
  );
};

const responseJson = (res: Response, json: Record<string, any>) => {
  res.status(200).send(json);
};

const responseOK = (res: Response) => {
  res.status(200).send({ message: 'OK' });
};

const responseCreated = (res: Response, createdId: number) => {
  res.status(201).send({ message: 'OK', id: createdId });
};

const getErrorResponse = (error: any) => {
  const res: Record<string, string> = {};
  error.errors.forEach((e: any) => {
    res[e.path] = e.message;
  });
  return res;
};

const getParameterErrorResponse = (errors: Array<any>) => {
  const res: Record<string, string> = {};
  errors.forEach((e) => {
    res[e.path] = e.msg;
  });
  return res;
};

const handleSequelizeError = (res: Response, error: any) => {
  if (
    error.name === SEQUELIZE_VALIDATION_ERROR ||
    error.name === SEQUELIZE_UNIQUE_CONSTRAINT_ERROR
  ) {
    responseBadRequest(
      res,
      getErrorResponse(error),
    );
    return true;
  }
  return false;
};

const handleParameterError = (req: Request, res: Response) => {
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
  result: [number] | null,
  res: Response,
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
