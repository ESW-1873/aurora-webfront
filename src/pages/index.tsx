import Router from 'next/router'
import React from 'react'
import { Top } from 'src/compositions/Top'
import { isProd } from 'src/utils/env'
import { isClient } from 'src/utils/typeguard'

//TODO: 10/1になったらaboutの中身に差し替える
//--------------------------------
const TopPage = () => {
  if (!isClient()) return <></>
  if (!isProd) return <Top></Top>

  const preferredLang =
    window.navigator.language || window.navigator.languages[0]
  if (preferredLang === 'ja' || preferredLang === 'ja-JP') {
    Router.replace('0x989690') // japanese one
  } else {
    Router.replace('0x989692') // english one
  }
  return <></>
}
//--------------------------------

export default TopPage
