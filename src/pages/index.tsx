import Router from 'next/router'
import { isClient } from 'src/utils/typeguard'

//TODO: 10/1になったらaboutの中身に差し替える
//--------------------------------
const TopPage = () => {
  if (!isClient()) return <></>

  const preferredLang =
    window.navigator.language || window.navigator.languages[0]
  if (preferredLang === 'ja' || preferredLang === 'ja-JP') {
    Router.replace('0x989690') // japanese one
  } else {
    Router.replace('hoge') // english one
  }
  return <></>
}
//--------------------------------

export default TopPage
