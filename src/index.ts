import Web3 from 'web3'
import { HttpProvider } from 'web3-core'
import { donationPost } from './contracts/abi/abi/abi'
import { DonationPost } from './external/contract/types/DonationPost'
var web3 = new Web3(
  new HttpProvider(
    'https://rinkeby.infura.io/v3/d06b171ef3ad461fb7e55d033343eba6',
  ),
)
web3.eth.defaultChain = 'rinkeby'

var contract = new web3.eth.Contract(
  donationPost,
  '0x80729a62735c58Fdb11b6fA119Ba779468036980',
) as unknown as DonationPost
contract.mint(
  '0x50414Ac6431279824df9968855181474c919a94B',
  'https://unyIhiKh3399qUszWer0fjy38ppVlujh35SRBAT7DL0',
)
