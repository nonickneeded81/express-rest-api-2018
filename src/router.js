import express from 'express';
import C from './controllers/index.js';
import {parameterValidator as V} from './middlewares/index.js';

const router = express.Router();

router.post('/posts', V.posts.create, C.posts.create);
router.get('/posts', V.posts.index, C.posts.index);
router.get('/posts/:id', V.posts.detail, C.posts.detail);
router.put('/posts/:id', V.posts.update, C.posts.update);

export default router;
