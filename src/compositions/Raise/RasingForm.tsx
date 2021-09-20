import dayjs from 'dayjs'
import React, { useEffect, useState, VFC } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useFormContext } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { postClient } from 'src/api/postClient'
import { IconImage } from 'src/assets/svgs'
import { PublishButton } from 'src/components/Buttons/CtaButton'
import { Image } from 'src/components/Image'
import {
  DEFAULT_CAPACITY,
  DEFAULT_PERIOD_SECONDS,
} from 'src/external/contract/hooks'
import { useImageCropModalStore } from 'src/stores'
import {
  defaultShadow,
  errorColor,
  gray,
  purple,
  white,
} from 'src/styles/colors'
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
  capacity?: number
  periodSeconds?: number
}

// プロジェクト有効期間の最大値: 7日間
const MAX_EXPIRATION_SECONDS = 60 * 60 * 24 * 7
export const RaisingForm: VFC<RaisingFormProps> = ({
  errorMessage,
  submit,
}) => {
  const [imgErrorMessage, setImgErrorMessage] = useState('')
  const { register, setValue, watch } = useFormContext<RaisingFormData>()
  const { open } = useImageCropModalStore()
  const imageUrl = watch('image.dataUrl')
  const baseDate = dayjs()
  useEffect(() => {
    register('image')
    register('title')
    register('periodSeconds')
    register('capacity')
  }, [register])

  return (
    <>
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
          onChange={({ target: { value } }) =>
            setValue(`title`, value.replace(/\r?\n/g, ''))
          }
          placeholder="Project Title(Within 30 chars)…"
          maxLength={30}
        />
        <DescriptionTextarea
          {...register('description')}
          placeholder="Project description(Within 800 chars)…"
          maxLength={800}
        />
        <ExpirationFormWrapper>
          <p>Period Datetime</p>
          <span>
            Please set expiration date. Maximum is 7 days. Default is 3 days.
          </span>
          <ReactDatePicker
            selected={baseDate
              .add(watch('periodSeconds') || 0, 'second')
              .toDate()}
            onChange={(d: Date) => {
              const periodSeconds = dayjs(d).diff(baseDate, 'second')
              if (periodSeconds > MAX_EXPIRATION_SECONDS) {
                setValue('periodSeconds', MAX_EXPIRATION_SECONDS)
              } else {
                setValue('periodSeconds', periodSeconds)
              }
            }}
            onChangeRaw={(e: React.FocusEvent<HTMLInputElement>) => {
              const input = dayjs(e.target.value, 'YYYY/MM/DD HH:mm:ss', true)
              if (input.isValid()) {
                const periodSeconds = input.diff(baseDate, 'second')
                if (periodSeconds > MAX_EXPIRATION_SECONDS) {
                  setValue('periodSeconds', MAX_EXPIRATION_SECONDS)
                } else {
                  setValue('periodSeconds', periodSeconds)
                }
              } else {
                // 入力形式が正しくない場合は、0にする
                setValue('periodSeconds', DEFAULT_PERIOD_SECONDS)
              }
            }}
            allowSameDay={false}
            minDate={baseDate.clone().toDate()}
            maxDate={baseDate.clone().second(MAX_EXPIRATION_SECONDS).toDate()}
            minTime={
              baseDate
                .clone()
                .add(watch('periodSeconds') || 0, 'second')
                .diff(
                  baseDate.clone().add(1, 'day').hour(0).minute(0).second(0),
                ) < 0
                ? baseDate.clone().toDate()
                : baseDate.clone().hour(0).minute(0).second(0).toDate()
            }
            maxTime={
              baseDate
                .clone()
                .add(watch('periodSeconds') || 0, 'second')
                .diff(
                  baseDate.clone().add(6, 'day').hour(0).minute(0).second(0),
                ) > 0
                ? baseDate.clone().toDate()
                : baseDate.clone().hour(23).minute(59).second(59).toDate()
            }
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={5}
            dateFormat="yyyy/MM/dd HH:mm:ss"
          />
          <ProjectSettingsBtn
            type="button"
            onClick={() => setValue('periodSeconds', MAX_EXPIRATION_SECONDS)}
          >
            MAX
          </ProjectSettingsBtn>
          <ProjectSettingsBtn
            type="button"
            onClick={() => setValue('periodSeconds', DEFAULT_PERIOD_SECONDS)}
          >
            RESET
          </ProjectSettingsBtn>
        </ExpirationFormWrapper>
        <CapacityDiv>
          <p>Capacity</p>
          <span>Please set capacity. Default is 100,000.</span>
          <div>
            <input
              {...register('capacity')}
              type="number"
              defaultValue={DEFAULT_CAPACITY}
            />
          </div>
          <ProjectSettingsBtn
            onClick={() => setValue('capacity', DEFAULT_CAPACITY)}
          >
            RESET
          </ProjectSettingsBtn>
        </CapacityDiv>
        <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
        <SubmitButton />
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
      (periodSeconds >= 0 && periodSeconds <= MAX_EXPIRATION_SECONDS)) &&
    (!capacity || capacity >= 0)
  return (
    <PublishButton
      className={className}
      type="submit"
      disabled={!isSubmittable}
    />
  )
})``

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
const Form = styled.form`
  padding-bottom: 64px;
  ${TitleTextarea} {
    margin-top: 32px;
  }
  ${DescriptionTextarea} {
    margin-top: 56px;
  }
  ${SubmitButton} {
    margin-top: 20px;
  }
  @media ${breakpoint.m} {
    font-size: 16px;
    ${TitleTextarea} {
      margin-top: 24px;
    }
    ${DescriptionTextarea} {
      margin-top: 32px;
    }
  }
`

const ProjectSettingsDiv = styled.div`
  border: 1px dotted;
  padding: 5px 10px 15px;
  input {
    margin: 0 8px;
    border: 1px solid;
  }
`

const cardText = css`
  font-family: ocr-a-std, monospace;
  font-weight: 400;
  font-style: normal;
  color: #231815;
`

const CardTitle = styled.p`
  ${cardText};
  font-size: 141.1627655029297px;
  width: 2472.62px;
  height: 141.34px;
`
const CardDescription = styled.p`
  ${cardText};
  font-size: 74px;
  width: 2592.38px;
  height: 1244.11px;
`

const ExpirationFormWrapper = styled.div`
  margin: 16px 0;
  input {
    border: 1px solid black;
    width: 200;
  }
`

const ProjectSettingsBtn = styled.button`
  margin: 4px 4px;
  width: 96px;
  height: 32px;
  border-radius: 16px;
  text-align: center;
  font-size: 12px;
  font-weight: ${fontWeightMedium};
  letter-spacing: 0.016em;
  background: ${gray};
  color: ${white};
  :hover {
    background: ${gray}7d;
  }
`
const CapacityDiv = styled.div`
  margin: 16px 0;
  input {
    border: 1px solid;
  }
`
