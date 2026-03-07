import {config} from 'dotenv';
import {sequelize} from './models/index.js';
import {app} from './app.js';

config();

let server;

const connectDB = () => {
  return sequelize
    .authenticate()
    .then(() => {
      console.log('DB connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
};

const startServer = async () => {
  await connectDB();
  server = await app.listen(3000, () => {
    console.log('server started');
  });
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('server closed');
      // process.exit doesn't wait for async processes
      process.exit(0);
    });

    setTimeout(() => {
      console.error('forcefully shutting down');
      process.exit(1);
    }, 3000);
  });
};

startServer();
