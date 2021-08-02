import { createGlobalStyle } from 'styled-components'
import { black, white } from './colors'
import { fontFamilyEn, fontWeightRegular } from './font'
import {
  noScrollbar,
  pageMarginCssVar,
  pageMarginNegativeCssVar,
} from './mixins'

export const GlobalStyles = () => {
  return (
    <>
      <Styles />
    </>
  )
}

const Styles = createGlobalStyle`
  img {
    vertical-align: bottom;
  }
  body {
    ${pageMarginCssVar}: max(5.12vw, 20px);
    ${pageMarginNegativeCssVar}: calc(0px - max(5.12vw, 20px));
    font-family: ${fontFamilyEn};
    font-weight: ${fontWeightRegular};
    background-color: ${white};
    color: ${black};
    min-height: 100vh;
    > div {
      height: 100%;
      display: flex;
      flex-flow: column;
      main {
        flex: 1;
      }
    }
    div {
      ${noScrollbar};
    }
  }
`
