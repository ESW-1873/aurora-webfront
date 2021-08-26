import { ButtonHTMLAttributes, VFC } from 'react'
import { IconTwitter } from 'src/assets/svgs'
import { twitter } from 'src/styles/colors'
import { flexCenter } from 'src/styles/mixins'
import { HOSTNAME } from 'src/utils/env'
import { shareWithTwitterUrl } from 'src/utils/snsSharing'
import styled from 'styled-components'
import { BaseButtonElement } from './CtaButton'

type TwitterShareButtonProps = {
  message: string
  path: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const TwitterShareButton: VFC<TwitterShareButtonProps> = ({
  message,
  path,
  ...props
}) => {
  const sharingUrl = `https://${HOSTNAME}/${path}`
  return (
    <ShareButtonElement
      {...props}
      onClick={() =>
        window.open(
          shareWithTwitterUrl(message, sharingUrl),
          'subwin',
          'width=640,height=320',
        )
      }
    >
      <IconTwitter />
      <span>Share on Twitter</span>
    </ShareButtonElement>
  )
}

const ShareButtonElement = styled(BaseButtonElement)`
  ${flexCenter}
  background: ${twitter};
  font-size: 16px;
  > svg {
    margin-right: 8px;
    width: 24px;
    height: 100%;
  }
  :hover,
  :focus {
    background: ${twitter}bf;
  }
`
