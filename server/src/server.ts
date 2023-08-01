import * as express from 'express';
import * as compression from 'compression';
import helmet from 'helmet';
import { lifecycle } from './lifecycle/lifecycle';
import { handleGetOrders } from './routes/handleGetOrders';
import { handlePostOrders } from './routes/handlePostOrders';
import { handlePostRequestQuotes } from './routes/handlePostRequestQuotes';
import { handlePostOrderBookings } from './routes/handlePostOrderBookings';

export const startServer = () => {
  const PORT = process.env.LOCAL_TESTING_PORT || 8044;
  const app = express();

  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(express.json());

  // routes
  app.get('/orders', handleGetOrders);
  app.post('/orders', handlePostOrders);
  app.post('/orders/:id/quotes', handlePostRequestQuotes);
  app.post('/orders/:id/bookings', handlePostOrderBookings);

  const server = app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
    lifecycle.on('close', () => {
      if (!server) {
        return;
      }

      server.close();
    });
  });

  return app;
};
