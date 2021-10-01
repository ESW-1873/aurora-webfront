import Router from 'next/router'
import React from 'react'
import { ABOUT } from 'src/utils/router'
import { isClient } from 'src/utils/typeguard'

const TopPage = () => {
  if (!isClient()) return <></>
  Router.replace(ABOUT)

  return <></>
}

export default TopPage
