import * as React from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { fontWeightBold } from 'src/styles/font'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

type ImageEditComponentProps = {
  closeModal: VoidFunction
  setImg: (objectUrl: string) => void
  editingImg: string
  displayWidth?: number
  initialCrop?: ReactCrop.Crop
}

export const ImageEditComponent: React.FC<ImageEditComponentProps> = ({
  closeModal,
  setImg,
  editingImg,
  initialCrop = { aspect: 3 / 2 },
  displayWidth = 1260,
}) => {
  const imgRef = React.useRef<HTMLImageElement>()
  const [crop, setCrop] = React.useState<ReactCrop.Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    ...initialCrop,
  })
  const [scale, setScale] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [currentPreviewUrl, setCurrentPreviewUrl] = React.useState('')
  const onLoad = React.useCallback((img) => {
    imgRef.current = img
    if (!imgRef.current) return false
    const { width, height } = imgRef.current
    const imgAspect = width / height
    const aspectRatio = crop.aspect || 1
    const aspectAppliedWidth =
      aspectRatio >= imgAspect ? width : (width / imgAspect) * aspectRatio
    const aspectAppliedHeight =
      aspectRatio <= imgAspect ? height : (height * imgAspect) / aspectRatio
    setCrop({
      unit: 'px',
      x: (width - aspectAppliedWidth) / 2,
      y: (height - aspectAppliedHeight) / 2,
      width: aspectAppliedWidth,
      aspect: crop.aspect,
    })
    return false
  }, [])

  const createCropPreview = async (
    image: HTMLImageElement,
    previewCrop: ReactCrop.Crop,
  ) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    setScale({ x: scaleX, y: scaleY })
    canvas.width = (previewCrop.width || 0) * scaleX
    canvas.height = (previewCrop.height || 0) * scaleY
    const ctx = canvas.getContext('2d')
    if (!ctx) return Promise.resolve()
    ctx.drawImage(
      image,
      (previewCrop.x || 0) * scaleX,
      (previewCrop.y || 0) * scaleY,
      (previewCrop.width || 0) * scaleX,
      (previewCrop.height || 0) * scaleY,
      0,
      0,
      previewCrop.width || 0,
      previewCrop.height || 0,
    )
    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return
        window.URL.revokeObjectURL(currentPreviewUrl)
        const url = window.URL.createObjectURL(blob)
        setCurrentPreviewUrl(url)
        resolve(url)
      })
    })
  }

  const resizeImage = async (
    image: HTMLImageElement,
    resizingCrop: ReactCrop.Crop,
    maxWidth?: number,
  ) => {
    if (!resizingCrop.width || !resizingCrop.height) return Promise.resolve()
    if (!maxWidth) return Promise.resolve(currentPreviewUrl)
    const croppedWidth = resizingCrop.width * scale.x
    const croppedHeight = resizingCrop.height * scale.y
    const width = croppedWidth > maxWidth ? maxWidth : croppedWidth
    const height =
      croppedWidth > maxWidth
        ? Math.round((croppedHeight * width) / croppedWidth)
        : croppedHeight
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return Promise.resolve()
    ctx.drawImage(
      image,
      (resizingCrop.x || 0) * scale.x,
      (resizingCrop.y || 0) * scale.y,
      (resizingCrop.width || 0) * scale.x,
      (resizingCrop.height || 0) * scale.y,
      0,
      0,
      width || 0,
      height || 0,
    )
    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return
        window.URL.revokeObjectURL(currentPreviewUrl)
        const objUrl = window.URL.createObjectURL(blob)
        setCurrentPreviewUrl(objUrl)
        resolve(objUrl)
      })
    })
  }

  const makeClientCrop = async (clientCrop: ReactCrop.Crop) => {
    if (imgRef.current && clientCrop.width && clientCrop.height) {
      createCropPreview(imgRef.current, clientCrop)
    }
  }

  return (
    <StyledImageEditComponent>
      <Description>Editing an image</Description>
      <ReactCrop
        src={editingImg}
        onImageLoaded={onLoad}
        // @ts-ignore
        crop={crop}
        imageStyle={{ maxHeight: '50vh' }}
        onChange={(changedCrop: ReactCrop.Crop) => {
          if (changedCrop.width && changedCrop.height) setCrop(changedCrop)
        }}
        onComplete={makeClientCrop}
        keepSelection
        minWidth={64}
        minHeight={64}
      />
      <ButtonDiv>
        <PrimaryButton
          label="Done"
          onClick={async () => {
            if (!imgRef.current) return
            const objUrl = await resizeImage(imgRef.current, crop, displayWidth)
            if (!objUrl) return
            setImg(objUrl)
            closeModal()
          }}
          disabled={!crop.width || !editingImg}
        />
      </ButtonDiv>
    </StyledImageEditComponent>
  )
}

const Description = styled.p`
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: ${fontWeightBold};
  letter-spacing: 0.016em;
  text-align: center;
`

const ButtonDiv = styled.div`
  margin-top: 4rem;
  width: 100%;
  ${flexCenter};
`

const StyledImageEditComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  .hidden {
    display: none;
  }
`
