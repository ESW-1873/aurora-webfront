import dayjs from 'dayjs'
import { PostProps } from 'src/compositions/Post'

export const MOCK_DONEE_ADDRESS = '0x1111111111111111111111111111111111111111'
export const MOCK_DONATION = {
  id: '0x2222222222222222222222222222222222222222',
}
export const MOCK_POST: PostProps['postProps'] = {
  id: '0xe6a8b2b83a40',
  keyVisual: '/assets/tmp/top.png',
  title: 'The Bringing Doge into Outer Space',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue porta felis, eget efficitur lectus bibendum a. Sed fermentum eleifend felis, at laoreet dui mattis eget. In ex risus, elementum eget dui at, gravida feugiat dolor. Nulla facilisi. Nulla vel tincidunt tortor, ac vulputate quam. In in libero ultricies, commodo velit vel, fringilla diam. Nam odio ligula, laoreet ut hendrerit id, tempor sed erat. Suspendisse at quam ac augue finibus ultrices et at magna. Proin pulvinar eu nunc eu varius. Nulla mattis lobortis est, facilisis bibendum nulla euismod id. Quisque consequat erat eu nisi imperdiet scelerisque. Pellentesque eget accumsan quam. Donec fringilla commodo posuere. Morbi condimentum pharetra lacus. Mauris consectetur orci quis nunc dictum molestie. Maecenas pulvinar eget.',
  donee: MOCK_DONEE_ADDRESS,
  totalDonation: '64732300000000000000',
  canceledDonations: [MOCK_DONATION, MOCK_DONATION, MOCK_DONATION],
  refundRequests: [MOCK_DONATION, MOCK_DONATION, MOCK_DONATION],
  hasClosed: false,
  doneeCredit: '3201',
  endTime: dayjs.unix(0),
}
