import { cpus } from 'os';
import { lifecycle } from './lifecycle';

const signalHandler = async (signal: NodeJS.Signals) => {
  console.info(`${signal} called.`);
  await lifecycle.close(0);

  process.exit();
};

export const setupNodeProcess = () => {
  console.info('node env stats', {
    availableParallelism: cpus().length,
  });

  process
    .on('SIGTERM', signalHandler)
    .on('SIGINT', signalHandler)
    .on('SIGQUIT', signalHandler);

  process
    .on('uncaughtException', async (err) => {
      console.error('Uncaught exception:', err);
      await lifecycle.close(1);
      process.exit();
    })
    .on('unhandledRejection', async (err) => {
      console.error('Unhandled rejection:', err);
      await lifecycle.close(1);
      process.exit();
    });
};
