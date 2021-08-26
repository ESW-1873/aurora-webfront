import '@google/model-viewer'
import { useEffect, useRef, VFC } from 'react'
import styled from 'styled-components'

export type ModelViewerProps = {
  src: string
  alt: string
  poster?: string
  onLoad?: (event: LoadEvent) => void
  onProgress?: (event: ProgressEvent) => void
}

type LoadEvent = {
  detail: {
    url: string
  }
}

type ProgressEvent = {
  detail: {
    totalProgress: number
  }
}

type ModelViewerEventType =
  | 'error'
  | 'load'
  | 'preload'
  | 'model-visibility'
  | 'progress'

type ModelViewerEventListner<E extends ModelViewerEventType> =
  E extends 'progress'
    ? (event: ProgressEvent) => void
    : E extends 'load'
    ? (event: LoadEvent) => void
    : () => void

type ModelViewerEventListnerAdder = <E extends ModelViewerEventType>(
  event: E,
  cb: ModelViewerEventListner<E>,
) => void

// see: https://modelviewer.dev/docs/index.html
type ModelViewerElement = {
  addEventListener: ModelViewerEventListnerAdder
}

export const ModelViewer: VFC<ModelViewerProps> = ({
  src,
  poster,
  alt,
  onLoad,
  onProgress,
}) => {
  const ref = useRef<ModelViewerElement>(null)
  useEffect(() => {
    if (!ref.current) return
    console.log(onLoad, onProgress)
    if (onLoad) ref.current.addEventListener('load', onLoad)
    if (onProgress) ref.current.addEventListener('progress', onProgress)
  }, [ref, onLoad, onProgress])
  return (
    <>
      <Layout>
        {/* @ts-ignore */}
        <model-viewer
          ref={ref}
          id="model"
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
}
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
