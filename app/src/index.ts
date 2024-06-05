import { app } from './app';
import { config } from './config';
import { initDbConnection } from './db';

async function main() {
  const { port } = config;

  await initDbConnection();

  app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
  });
}

main();
