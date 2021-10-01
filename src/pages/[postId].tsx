import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { getPostContent } from 'src/api/arweaveClient'
import { GetPostContent } from 'src/api/client'
import { PostContainer, PostStaticProps } from 'src/container/PostContainer'
import { DEFAULT_PERIOD_SECONDS } from 'src/external/contract/hooks'
import { isProd } from 'src/utils/env'
import { isString } from 'src/utils/typeguard'

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
  const data = await GetPostContent({ id: params.postId }).catch(() => null)
  if (!data?.postContent)
    return {
      notFound: true,
    }

  const { id, metadata, donee, endTime, capacity } = data.postContent || {}

  const post =
    metadata && endTime > Math.floor(new Date().getTime() / 1000)
      ? await getPostContent(metadata)
      : {
          name: '',
          image: '',
          description: '',
        }

  const props: PostStaticProps = {
    postStaticProps: {
      id,
      title: post.name,
      keyVisual: post.image,
      description: post.description,
      donee,
      endTime,
      capacity,
    },
  }

  const result = {
    props,
    revalidate: isProd ? DEFAULT_PERIOD_SECONDS : 1,
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
