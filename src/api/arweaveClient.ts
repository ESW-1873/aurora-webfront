import Arweave from 'arweave'

const client = Arweave.init({
  host: 'arweave.net',
  protocol: 'https',
  port: 443,
  timeout: 20000,
  logging: false,
})

type Post = {
  name: string
  description: string
  image: string
}

export const getPostContent = async (metadata: string) => {
  const res = await client.transactions.getData(metadata, {
    decode: true,
    string: true,
  })
  return JSON.parse(String(res)) as Post
}
