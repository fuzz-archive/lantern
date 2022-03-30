import fetch from 'node-fetch'

export const globalAny = global as any

globalAny.fetch = fetch