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
