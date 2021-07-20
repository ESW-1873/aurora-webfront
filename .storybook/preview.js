import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'Desktop',
    viewports: {
      Desktop: {
        name: 'Desktop',
        styles: {
          height: '1080px',
          width: '1920px',
        },
      },
      iPhone12: {
        name: 'iPhone12/12Pro',
        styles: {
          width: '390px',
          height: '844px',
        },
      },
    },
  },
}
