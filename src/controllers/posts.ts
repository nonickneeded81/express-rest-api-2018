import { Request, Response } from 'express';
import { response, query } from '../services';
import { db } from '../models';
import { createWhereBuilder } from './common/';

const create = async (req: Request, res: Response) => {
  try {
    if (response.handleParameterError(req, res)) {
      return;
    }
    const { body } = req;
    const post = await db.Post.create({
      title: body.title,
      body: body.body,
    });

    response.responseCreated(res, (post as any).id);
  } catch (e: any) {
    if (response.handleSequelizeError(res, e)) {
      return;
    }
    response.responseInternalServerError(res, e);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    if (response.handleParameterError(req, res)) {
      return;
    }
    const { body } = req;
    const post = await db.Post.update({
      title: body.title,
      body: body.body,
    }, { where: { id: req.params.id } });

    if (response.handleNotUpdated(post, res)) {
      return;
    }

    response.responseOK(res);
  } catch (e: any) {
    if (response.handleSequelizeError(res, e)) {
      return;
    }
    response.responseInternalServerError(res, e);
  }
};

const detail = async (req: Request, res: Response) => {
  try {
    if (response.handleParameterError(req, res)) {
      return;
    }

    const post = await db.Post.findByPk(req.params.id as string);

    if (!post) {
      response.responseNotFound(res, 'Post');
      return;
    }

    response.responseJson(res, {
      id: (post as any).id,
      title: (post as any).title,
      body: (post as any).body,
      created_at: (post as any).created_at,
      updated_at: (post as any).updated_at,
    });
  } catch (e: any) {
    response.responseInternalServerError(res, e);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    if (response.handleParameterError(req, res)) {
      return;
    }

    const q = req.query as any;
    const postsWhere = createWhereBuilder();
    postsWhere.likeQuery('title', q.title);
    postsWhere.likeQuery('body', q.body);

    const { limit, offset, page, perPage } = query.createPaginationQuery(req);
    const posts = await db.Post.findAndCountAll({
      where: postsWhere.generateQuery(),
      offset,
      limit,
      order: query.createOrderQuery(req) as any,
    });

    if (posts.rows.length === 0) {
      response.responseNotFound(res, 'Posts');
      return;
    }

    response.responseJson(res, {
      posts: posts.rows.map(post => ({
        id: (post as any).id,
        title: (post as any).title,
        body: (post as any).body,
        created_at: (post as any).created_at,
        updated_at: (post as any).updated_at,
      })),
      ...response.createPaginationResponse(page, perPage, posts.count),
    });
  } catch (e: any) {
    response.responseInternalServerError(res, e);
  }
};

export default {
  create,
  update,
  detail,
  index,
};
