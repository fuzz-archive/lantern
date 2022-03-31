import { createTRPCClient, HTTPHeaders } from '@trpc/client'
import { httpLink } from '@trpc/client/links/httpLink'
import { splitLink } from '@trpc/client/links/splitLink'
import type { AppRouter } from '../../server/src/router'
import './polyfill'

interface ClientOptions {
  port?: number
  prefix?: string
  headers?: HTTPHeaders
}

export function createClient(host: string, options: ClientOptions = {}) {
  const port = options.port ?? 80
  const prefix = options.prefix ?? '/trpc'
  const url = port ? `${host}:${port}${prefix}` : `${host}${prefix}`
  
  return createTRPCClient<AppRouter>({
    url,
    headers: options.headers,
    links: [
      splitLink({
        condition(op) {
          return op.context.skipBatch === true
        },
        true: httpLink({
          url
        }),
        false: httpLink({ url })
      })
    ]
  })
}