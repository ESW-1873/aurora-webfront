import { MOCK_DONATION } from './donation'

export const MOCK_DONEE_ADDRESS = '0x1111111111111111111111111111111111111111'
export const MOCK_POST = {
  id: 'hogehogehogehoge',
  imageUrl: '/assets/tmp/top.png',
  title: 'The Bringing Doge into Outer Space',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue porta felis, eget efficitur lectus bibendum a. Sed fermentum eleifend felis, at laoreet dui mattis eget. In ex risus, elementum eget dui at, gravida feugiat dolor. Nulla facilisi. Nulla vel tincidunt tortor, ac vulputate quam. In in libero ultricies, commodo velit vel, fringilla diam. Nam odio ligula, laoreet ut hendrerit id, tempor sed erat. Suspendisse at quam ac augue finibus ultrices et at magna. Proin pulvinar eu nunc eu varius. Nulla mattis lobortis est, facilisis bibendum nulla euismod id. Quisque consequat erat eu nisi imperdiet scelerisque. Pellentesque eget accumsan quam. Donec fringilla commodo posuere. Morbi condimentum pharetra lacus. Mauris consectetur orci quis nunc dictum molestie. Maecenas pulvinar eget.',
  donee: MOCK_DONEE_ADDRESS,
  capacity: 70,
  donatedSum: 64.7323,
  canceled: [MOCK_DONATION, MOCK_DONATION, MOCK_DONATION],
  refundRequested: [MOCK_DONATION, MOCK_DONATION, MOCK_DONATION],
  credit: 3201,
}
