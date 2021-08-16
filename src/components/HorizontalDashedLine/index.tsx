import { primaryColor } from 'src/styles/colors'
import styled from 'styled-components'

export const HorizontalDashedLine = styled.div`
  height: 1px;
  position: relative;
  ::before {
    content: '';
    background-image: linear-gradient(
      to right,
      ${primaryColor},
      ${primaryColor},
      7px,
      transparent 7px,
      transparent 15px
    );
    background-size: 15px 1px;
    background-repeat: repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`
