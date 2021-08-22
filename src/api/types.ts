import { GetPostContentQuery } from 'src/__generated__/graphql/graphql'

type ElementType<T> = T extends (infer A)[] ? A : never

export type Donation = Omit<
  ElementType<
    NonNullable<
      Required<NonNullable<GetPostContentQuery['postContent']>>['donations']
    >
  >,
  '__typename'
>
