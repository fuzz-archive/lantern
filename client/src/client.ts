import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from '../../server/src/router/index';
import './polyfill';

const client = createTRPCClient<AppRouter>({
  url: 'http://localhost:3000/trpc'
});

(async () => {
  console.log(await client.query('hello', { username: 'bob' }))
})()
