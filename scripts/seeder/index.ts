import { Client } from 'pg';

async function initializeClient() {
  const client = new Client();
  return client.connect('');
}

async function seed() {
  const client = await initializeClient();
  await client.query('', []);
}

seed();
