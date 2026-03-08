import g from './mock-generator.js';
import {db} from '../../models/index.js';

const builder = (i = 0) => {
  return {
    id: i + 1,
    title: `TITLE${i}`,
    body: `BODY${i}`,
  };
};

export default g.exportAll(builder, db.Post);
