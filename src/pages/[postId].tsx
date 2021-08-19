import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { publicApiClient } from 'src/api/client'
import { PostContainer, PostStaticProps } from 'src/container/PostContainer'
import { isProd } from 'src/utils/env'
import { isString } from 'src/utils/typeguard'
import {
  GetPostContentDocument,
  GetPostContentQuery,
  GetPostContentQueryVariables,
} from 'src/__generated__/graphql'

type PostPageContext = {
  postId: string
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<PostPageContext> = async ({
  params = {},
}) => {
  if (!isString(params.postId))
    return {
      notFound: true,
    }
  const client = publicApiClient()
  if (!client)
    return {
      notFound: true,
    }

  const { data, error } = await client
    .query<GetPostContentQuery, GetPostContentQueryVariables>(
      GetPostContentDocument,
      { id: params.postId },
    )
    .toPromise()

  if (error || !data?.postContent)
    return {
      notFound: true,
    }

  const { id, title, imageUrl, description, donee, endTime } =
    data.postContent || {}

  const props: PostStaticProps = {
    postStaticProps: {
      id,
      title,
      keyVisual: imageUrl,
      description,
      donee,
      endTime,
    },
  }

  const result = {
    props,
    revalidate: isProd ? undefined : 1,
  }
  return JSON.parse(JSON.stringify(result))
}

const PostPage: NextPage<PostStaticProps> = ({ postStaticProps }) => (
  <PostContainer
    postStaticProps={postStaticProps}
    seoProps={{
      pageTitle: postStaticProps.title,
      image: postStaticProps.keyVisual,
    }}
  />
)

export default PostPage
