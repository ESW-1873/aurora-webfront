import { css } from 'styled-components'
import { black } from './colors'

export const pageMarginCssVar = '--page-margin'
export const pageMarginNegativeCssVar = '--page-margin-negative'

export const pageGuide = css`
  padding-left: var(${pageMarginCssVar});
  max-width: calc(1080px + var(${pageMarginCssVar}) * 2);
`

export const noGuide = css`
  margin-right: var(${pageMarginNegativeCssVar});
  margin-left: var(${pageMarginNegativeCssVar});
`

export const noScrollbar = css`
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

export const absoluteFill = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`

export const defaultShadow = `0 3px 2px ${black}80`

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const lessThanTablet = 'screen and (max-width:960px)'

const size = {
  s: '480px',
  m: '845px',
  l: '960px',
}

export const breakpoint = {
  s: `screen and (max-width:${size.s})`,
  m: `screen and (max-width:${size.m})`,
  l: `screen and (max-width:${size.l})`,
}

export const headerHeight = `64px`
export const inset0 = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`
