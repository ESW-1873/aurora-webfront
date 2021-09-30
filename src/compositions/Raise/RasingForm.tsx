import dayjs from 'dayjs'
import React, { useEffect, useState, VFC } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useFormContext } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { postClient } from 'src/api/postClient'
import { IconImage } from 'src/assets/svgs'
import { PreviewButton, PublishButton } from 'src/components/Buttons/CtaButton'
import { Image } from 'src/components/Image'
import { ModelViewerModal } from 'src/components/Modal/ModelViewerModal'
import {
  DEFAULT_CAPACITY,
  DEFAULT_PERIOD_SECONDS,
  MAX_PERIOD_SECONDS,
} from 'src/external/contract/hooks'
import {
  useImageCropModalStore,
  useLoadingModalStore,
  useModelViewerModalStore,
} from 'src/stores'
import { defaultShadow, errorColor, purple, white } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightMedium,
  fontWeightRegular,
  fontWeightSemiBold,
} from 'src/styles/font'
import {
  absoluteFill,
  breakpoint,
  flexCenter,
  noGuide,
} from 'src/styles/mixins'
import { readAsDataURLAsync } from 'src/utils/reader'
import styled, { css } from 'styled-components'

export type RaisingFormProps = {
  submit: VoidFunction
  errorMessage: string
}
export type RaisingFormData = Omit<
  NonNullable<Parameters<typeof postClient.postPost>['0']>,
  'image'
> & {
  image: {
    dataUrl: string
    contentType: string
  }
  capacity: number
  periodSeconds: number
}

export const RaisingForm: VFC<RaisingFormProps> = ({
  errorMessage,
  submit,
}) => {
  const [imgErrorMessage, setImgErrorMessage] = useState('')
  const [previewResponse, setPreviewResponse] = useState<{
    temporalyUrl: string
    token: string
  } | null>(null)
  const { register, setValue, watch } = useFormContext<RaisingFormData>()
  const { open } = useImageCropModalStore()
  const imageUrl = watch('image.dataUrl')
  const baseDate = dayjs()
  const inputNumberRegex = RegExp(`^[1-9][0-9]{0,7}$`) // Natural number
  useEffect(() => {
    register('image')
    register('title')
    register('periodSeconds')
    register('capacity')
  }, [register])

  return (
    <>
      {/** カードのプレビューを表示する */}
      <ModelViewerModal />
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <UploadImageDiv>
          <UploadImageLabel $hasImage={!!imageUrl}>
            <input
              type="file"
              onChange={async ({ target: { files } }) => {
                if (!files?.length) return
                const objectUrl = window.URL.createObjectURL(files[0])
                open({
                  src: objectUrl,
                  save: async (url: string) => {
                    const file = await (await fetch(url)).blob()
                    if (file.size >= 1024 * 1024 * 5) {
                      setImgErrorMessage('Images must be smaller than 5MB')
                      return
                    }
                    const dataUrl = await readAsDataURLAsync(file)
                    if (!dataUrl) return
                    setValue('image', {
                      dataUrl,
                      contentType: file.type,
                    })
                  },
                })
                setPreviewResponse(null) // Preview用Cardの情報を破棄する
              }}
              accept="image/*"
            />
            {imageUrl && <Image src={imageUrl} alt="" />}
            <UploadCta $hasImage={!!imageUrl} />
            <ErrorMessage visible={!!imgErrorMessage}>
              {imgErrorMessage}
            </ErrorMessage>
          </UploadImageLabel>
        </UploadImageDiv>
        <TitleTextarea
          onChange={({ target: { value } }) => {
            setValue(`title`, value.replace(/\r?\n/g, ''))
            setPreviewResponse(null) // Preview用Cardの情報を破棄する
          }}
          placeholder="Project Title(Within 30 chars)…"
          maxLength={30}
        />
        <DescriptionTextarea
          onChange={({ target: { value } }) => {
            setValue(`description`, value)
            setPreviewResponse(null) // Preview用Cardの情報を破棄する
          }}
          placeholder="Project description(Within 800 chars)…"
          maxLength={800}
        />
        <ProjectSettingsDiv>
          {/** Setting the end Date/Time */}
          <EndDateTimeDiv>
            <p>End Date/Time</p>
            <InputRightDiv>
              <ReactDatePicker
                selected={baseDate
                  .add(watch('periodSeconds') || 0, 'second')
                  .toDate()}
                onChange={(d: Date) => {
                  const periodSeconds = dayjs(d).diff(baseDate, 'second')
                  if (periodSeconds > MAX_PERIOD_SECONDS) {
                    // 入力値が最大値を超えた場合には、最大値を設定する
                    setValue('periodSeconds', MAX_PERIOD_SECONDS)
                  } else {
                    setValue('periodSeconds', periodSeconds)
                  }
                }}
                onChangeRaw={(e: React.FocusEvent<HTMLInputElement>) => {
                  const input = dayjs(e.target.value, 'MMM d, yyyy HH:mm', true)
                  if (input.isValid()) {
                    const periodSeconds = input.diff(baseDate, 'second')
                    if (periodSeconds > MAX_PERIOD_SECONDS) {
                      // 入力値が最大値を超えた場合には、最大値を設定する
                      setValue('periodSeconds', MAX_PERIOD_SECONDS)
                    } else {
                      setValue('periodSeconds', periodSeconds)
                    }
                  } else {
                    // 入力形式が正しくない場合は、デフォルトに戻す
                    setValue('periodSeconds', DEFAULT_PERIOD_SECONDS)
                  }
                }}
                allowSameDay={false}
                minDate={baseDate.clone().toDate()}
                maxDate={baseDate.clone().second(MAX_PERIOD_SECONDS).toDate()}
                minTime={
                  baseDate
                    .clone()
                    .add(watch('periodSeconds') || 0, 'second')
                    .diff(
                      baseDate
                        .clone()
                        .add(1, 'day')
                        .hour(0)
                        .minute(0)
                        .second(0),
                    ) < 0
                    ? baseDate.clone().toDate()
                    : baseDate.clone().hour(0).minute(0).second(0).toDate()
                }
                maxTime={
                  baseDate
                    .clone()
                    .add(watch('periodSeconds') || 0, 'second')
                    .diff(
                      baseDate
                        .clone()
                        .add(6, 'day')
                        .hour(0)
                        .minute(0)
                        .second(0),
                    ) > 0
                    ? baseDate.clone().toDate()
                    : baseDate.clone().hour(23).minute(59).second(59).toDate()
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="MMM d, yyyy HH:mm"
              />
            </InputRightDiv>
          </EndDateTimeDiv>
          {/** Setting donation to limited quantity */}
          <CapacityDiv>
            <p>Donations limit</p>
            <InputRightDiv>
              <input
                value={watch('capacity')}
                pattern="^[1-9]*[0-9]*$"
                minLength={1}
                inputMode="numeric"
                onChange={({ target: { value } }) => {
                  if (inputNumberRegex.test(value)) {
                    setValue(`capacity`, Number(value))
                  }
                }}
                defaultValue={DEFAULT_CAPACITY}
              />
            </InputRightDiv>
          </CapacityDiv>
        </ProjectSettingsDiv>
        <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
        <ButtonsLayout>
          <SubmitButton />
          <PreviewButtonContainer
            previewResponse={previewResponse}
            setPreviewResponse={setPreviewResponse}
          />
        </ButtonsLayout>
      </Form>
    </>
  )
}

const SubmitButton = styled(({ className }) => {
  const { watch } = useFormContext<RaisingFormData>()
  const {
    image,
    title = '',
    description = '',
    periodSeconds,
    capacity,
  } = watch()
  const isSubmittable =
    image &&
    title.length > 0 &&
    title.length <= 30 &&
    description.length > 0 &&
    description.length <= 800 &&
    (!periodSeconds ||
      (periodSeconds > 0 && periodSeconds <= MAX_PERIOD_SECONDS)) &&
    (!capacity || capacity > 0)
  return (
    <PublishButton
      className={className}
      type="submit"
      disabled={!isSubmittable}
    />
  )
})``

const PreviewButtonContainer: VFC<{
  previewResponse: {
    temporalyUrl: string
    token: string
  } | null
  setPreviewResponse: React.Dispatch<
    React.SetStateAction<{
      temporalyUrl: string
      token: string
    } | null>
  >
}> = ({ previewResponse, setPreviewResponse }) => {
  const { close: closeLoadingModal, open: openLoadingModal } =
    useLoadingModalStore()
  const { watch } = useFormContext<RaisingFormData>()
  const { open: openModelViewerModal } = useModelViewerModalStore()
  const { image, title = '', description = '' } = watch()
  const isAvailable =
    image &&
    title.length > 0 &&
    title.length <= 30 &&
    description.length > 0 &&
    description.length <= 800

  const requestPreview = async () => {
    const alt = 'Preview Card'
    if (previewResponse) {
      openModelViewerModal({
        src: previewResponse.temporalyUrl,
        alt: alt,
      })
      return
    }
    openLoadingModal({
      heading: 'Waiting for creating Preview Card',
      subHeading: '',
    })
    const res = await postClient.previewPost({
      title: title,
      description: description,
      image: {
        data: image.dataUrl.replace(/data.*base64,/, ''),
        contentType: image.contentType,
      },
    })
    openModelViewerModal({
      src: res.data.temporalyUrl,
      alt: alt,
      onLoad: closeLoadingModal,
    })
    setPreviewResponse({
      temporalyUrl: res.data.temporalyUrl,
      token: res.data.token,
    })
  }

  return (
    <PreviewButton
      type="button"
      disabled={!isAvailable}
      onClick={requestPreview}
    />
  )
}

type UploadCtaStyleProps = { $hasImage: boolean }
const UploadCta: VFC<UploadCtaStyleProps> = ({ $hasImage }) => (
  <UploadCtaDiv>
    <IconImage />
    <p>{$hasImage ? 'Change' : 'Add'} Image</p>
  </UploadCtaDiv>
)

const UploadCtaDiv = styled.div`
  flex-direction: column;
  filter: drop-shadow(${defaultShadow});

  p {
    text-shadow: ${defaultShadow};
    color: ${white};
    font-weight: ${fontWeightSemiBold};
    letter-spacing: -0.04em;
  }
`
const UploadImageDiv = styled.div`
  @media ${breakpoint.m} {
    ${noGuide};
  }
`
const UploadImageLabel = styled.label<UploadCtaStyleProps>`
  display: block;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 66.6667%;
  background-color: ${purple}80;
  cursor: pointer;
  > * {
    ${absoluteFill};
    ${flexCenter};
  }
  > input {
    display: none;
  }
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ $hasImage }) =>
    $hasImage &&
    css`
      > * {
        transition: all 0.25s ease-out;
      }
      ${UploadCtaDiv} {
        opacity: 0;
      }
      :hover {
        img {
          filter: brightness(0.5);
        }
        ${UploadCtaDiv} {
          opacity: 1;
        }
      }
    `}
`
const TitleTextarea = styled.textarea`
  width: 100%;
  height: 234px;
  resize: none;

  font-size: 64px;
  font-weight: ${fontWeightBold};
  @media ${breakpoint.m} {
    font-size: 32px;
  }
`
const DescriptionTextarea = styled(TextareaAutosize)`
  width: 100%;
  min-height: 72px;
  resize: none;

  font-size: 20px;
  font-weight: ${fontWeightRegular};
  line-height: 2;
  letter-spacing: 0.03rem;
  @media ${breakpoint.m} {
    font-size: 16px;
  }
`
const ErrorMessage = styled.p<{ visible: boolean }>`
  margin-top: 20px;
  height: 80px;
  color: ${errorColor};
  font-weight: ${fontWeightBold};
  visibility: ${({ visible }) => (visible ? 'visibile' : 'hidden')};
  @media ${breakpoint.m} {
    font-size: 16px;
  }
`

const ButtonsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${breakpoint.s} {
    flex-direction: column;
    gap: 16px 0;
  }
`

const Form = styled.form`
  padding-bottom: 64px;
  ${TitleTextarea} {
    margin-top: 32px;
  }
  ${DescriptionTextarea} {
    margin-top: 56px;
  }
  @media ${breakpoint.m} {
    font-size: 16px;
    ${TitleTextarea} {
      margin-top: 24px;
      height: 120px;
    }
    ${DescriptionTextarea} {
      margin-top: 24px;
    }
  }
`

const projectSettingDivStyled = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 20px;
    font-weight: ${fontWeightBold};
    line-height: 1.2;
    letter-spacing: 0;
  }
  input {
    font-size: 20px;
    font-weight: ${fontWeightMedium};
    letter-spacing: 0.04em;
    text-align: right;
    width: 100%;
  }
  :first-child {
    margin-bottom: 24px;
  }
`

const EndDateTimeDiv = styled.div`
  ${projectSettingDivStyled}
`

const CapacityDiv = styled.div`
  ${projectSettingDivStyled}
`

const InputRightDiv = styled.div`
  display: flex;
  max-width: 200px;
  border-bottom: 1px solid;
  padding-right: 8px;
`

const ProjectSettingsDiv = styled.div`
  margin-top: 64px;
  @media ${breakpoint.m} {
    margin-top: 54px;
    p,
    input {
      font-size: 16px;
    }
    ${InputRightDiv} {
      max-width: 160px;
    }
  }
`

const PreviewWrapper = styled.div`
  margin: 16px 0;
`

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 66.7%;
  @media ${breakpoint.m} {
    ${noGuide}
    width: 100vw;
  }
`
