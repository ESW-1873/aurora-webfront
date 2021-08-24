import { GraphQLClient } from 'graphql-request'
import { useEffect, useState } from 'react'
import { GRAPHQL_ENDPOINT } from 'src/utils/env'
import { getSdk } from 'src/__generated__/graphql/graphql'
import { PromiseType } from 'utility-types'

const sdk = getSdk(new GraphQLClient(GRAPHQL_ENDPOINT))

export const GetPostContent = sdk.GetPostContent

export const GetPostContents = sdk.GetPostContents

export const usePostContent = (id: string) => {
  const [data, setData] =
    useState<PromiseType<ReturnType<typeof GetPostContent>>>()
  useEffect(() => {
    GetPostContent({ id }).then(setData)
  }, [id])
  return {
    data,
    refetch: () =>
      GetPostContent({ id }).then((res) => {
        if (!res.postContent) return undefined
        setData(res)
        return res.postContent
      }),
  }
}
