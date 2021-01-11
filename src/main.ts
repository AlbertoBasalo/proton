import { startServer } from './server';
async function init() {
  try {
    const server = await startServer();
    console.info(`Server started ${JSON.stringify(server.address())}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}
init();
