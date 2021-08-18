import { NextPage } from 'next'
import React from 'react'
import { Post } from 'src/compositions/Post'

// TODO: fetch data

// type PostPageContext = {
//   postId: string
// }

// export const getStaticPaths: GetStaticPaths = async () => ({
//   paths: [],
//   fallback: 'blocking',
// })

// export const getStaticProps: GetStaticProps<PostPageContext> = async ({
//   params,
// }) => {
//   if (!params?.postId)
//     return {
//       notFound: true,
//     }
//   const client = publicApiClient()
//   if (!client)
//     return {
//       notFound: true,
//     }

//   const result = {
//     props,
//     revalidate: isProd ? 86400 : 1,
//   }
//   return JSON.parse(JSON.stringify(result))
// }

const PostPage: NextPage = () => <Post />

export default PostPage
