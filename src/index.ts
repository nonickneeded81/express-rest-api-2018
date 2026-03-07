import http from 'http';
import { sequelize } from './models';
import { app } from './app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

let server: http.Server | undefined;

const connectDB = () => {
  return sequelize
    .authenticate()
    .then(() => {
      console.log('DB connection has been established successfully.');
    })
    .catch((err: Error) => {
      console.error('Unable to connect to the database:', err);
    });
};

const startServer = async () => {
  await connectDB();
  server = app.listen(3000, () => {
    console.log('server started');
  });
  process.on('SIGTERM', () => {
    if (server) {
      server.close(() => {
        console.log('server closed');
        process.exit(0);
      });
    }

    setTimeout(() => {
      console.error('forcefully shutting down');
      process.exit(1);
    }, 3000);
  });
};

startServer();
