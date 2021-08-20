import { GetPostContentQuery } from 'src/__generated__/graphql'

export const INITIAL_POST: NonNullable<GetPostContentQuery['postContent']> = {
  capacity: 0,
  donatedCount: 0,
  donatedSum: '0',
  donee: '',
  endTime: 0,
  id: '',
  metadata: '',
  periodHours: 0,
  startTime: 0,
  withdrawn: '0',
}
