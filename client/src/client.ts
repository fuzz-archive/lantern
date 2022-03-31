import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from '../../server/src/router/index';
import './polyfill';

const client = createTRPCClient<AppRouter>({
  url: 'http://lantern.cluster.ws/trpc',
  headers: {
    username: 'Archer'
  }
});

(async () => {
  console.log(await client.query('hello'))
})()