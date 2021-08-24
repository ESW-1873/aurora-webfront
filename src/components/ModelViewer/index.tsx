import '@google/model-viewer'
import styled from 'styled-components'

export type ModelViewerProps = {
  src: string
  alt: string
  poster?: string
}

// @ts-ignore
export const ModelViewer: VFC<ModelViewerProps> = ({ src, poster, alt }) => (
  <>
    <Layout>
      {/* @ts-ignore */}
      <model-viewer
        src={src} // glb/gltf
        poster={poster}
        alt={alt}
        loading="eager"
        autoplay
        auto-rotate
        camera-controls
        shadow-intensity="1"
        shadow-softness="0.8"
        environment-image="neutral" // 露光調節
        exposure="3" // 露光調節
        // disable-zoom //
        style={{ '--poster-color': 'transparent' }}
      />
    </Layout>
  </>
)
const Layout = styled.div`
  width: 100%;
  height: 100%;
  * {
    width: 100%;
    height: 100%;
    min-height: 360px;
    margin: 0 auto;
  }
`

export default ModelViewer
