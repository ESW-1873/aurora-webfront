import { createGlobalStyle, css } from 'styled-components'
import { primaryColor, white } from './colors'
import { fontFamilyEn, fontWeightBold, fontWeightRegular } from './font'
import {
  breakpoint,
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

const heading2Style = css`
  font-size: 64px;
  font-weight: ${fontWeightBold};
  line-height: 1;
  @media ${breakpoint.m} {
    font-size: 32px;
    line-height: 1.2;
  }
`

const paragraphStyle = css`
  font-size: 20px;
  line-height: 2;
  letter-spacing: 0.03em;
  white-space: pre-wrap;
  @media ${breakpoint.m} {
    font-size: 16px;
    line-height: unset;
    letter-spacing: unset;
    line-height: calc(24 / 16);
  }
`

const Styles = createGlobalStyle`
  img {
    vertical-align: bottom;
  }
  html {
    height: 100%;
  }
  h2 {
    ${heading2Style};
  }
  p {
    ${paragraphStyle};
  }
  body {
    ${pageMarginCssVar}: max(5.12vw, 20px);
    ${pageMarginNegativeCssVar}: calc(0px - max(5.12vw, 20px));
    font-family: ${fontFamilyEn};
    font-weight: ${fontWeightRegular};
    background-color: ${white};
    color: ${primaryColor};
    min-height: 100vh;
    height: 100%;
    > div#__next {
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
