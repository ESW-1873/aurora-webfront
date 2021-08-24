import { GetPostContentQuery } from 'src/__generated__/graphql/graphql'

type ElementType<T> = T extends (infer A)[] ? A : never

export type PostContent =
  | NonNullable<GetPostContentQuery['postContent']>
  | undefined

export type Donation = Omit<
  ElementType<NonNullable<PostContent>['donations']>,
  '__typename'
>
