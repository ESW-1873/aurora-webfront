import Router from 'next/router'
import { isProd } from 'src/utils/env'
import { isClient } from 'src/utils/typeguard'

const TopPage = () => {
  if (!isClient()) return <></>
  if (isProd) {
    Router.replace('404')
  } else {
    Router.replace('0xe6a8b2b83a40')
  }
  return <></>
}

export default TopPage
