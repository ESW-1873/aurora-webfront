import { POST_API_ENDPOINT } from 'src/utils/env'
import { Configuration, DefaultApiFactory } from 'src/__generated__/restapi'

export const postClient = DefaultApiFactory(
  new Configuration({
    basePath: POST_API_ENDPOINT,
  }),
)
