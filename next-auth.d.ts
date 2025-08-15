import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  // eslint-disable-next-line
  interface Session {
    user: {
      id?: string
    } & DefaultSession['user']
  }
}
