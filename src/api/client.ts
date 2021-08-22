import { dedupExchange, fetchExchange } from '@urql/core'
import { cacheExchange } from '@urql/exchange-graphcache'
import { initUrqlClient } from 'next-urql'
import { GRAPHQL_ENDPOINT } from 'src/utils/env'
import schema from 'src/__generated__/graphql/introspection'

export const publicApiClient = () => {
  const client = initUrqlClient(
    {
      url: GRAPHQL_ENDPOINT,
      exchanges: [dedupExchange, cacheExchange({ schema }), fetchExchange],
    },
    false,
  )
  if (!client) throw new Error('failed to initialize graphql client.')
  return client
}
