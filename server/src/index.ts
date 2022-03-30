import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import fp from 'fastify-plugin'
import { createContext } from './router/context'
import { appRouter } from './router/index'

const app = fastify()

app.register(fp(fastifyTRPCPlugin), {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext }
})

app.listen(3000)