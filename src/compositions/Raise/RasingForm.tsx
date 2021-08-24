import React, { useEffect, useState, VFC } from 'react'
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
import { defaultShadow, errorColor, purple, white } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightRegular,
  fontWeightSemiBold,
} from 'src/styles/font'
import {
  absoluteFill,
  breakpoint,
  flexCenter,
  noGuide,
} from 'src/styles/mixins'
import { isProd, IS_STORYBOOK } from 'src/utils/env'
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

export const RaisingForm: VFC<RaisingFormProps> = ({
  errorMessage,
  submit,
}) => {
  const [imgErrorMessage, setImgErrorMessage] = useState('')
  const { register, setValue, watch } = useFormContext<RaisingFormData>()
  const imageUrl = watch('image.dataUrl')
  useEffect(() => {
    register('image')
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
                const file = files[0]
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
          {...register('title')}
          placeholder="Project Title(Within 30 chars)…"
          maxLength={30}
        />
        <DescriptionTextarea
          {...register('description')}
          placeholder="Project description(Within 800 chars)…"
          maxLength={800}
        />
        {!isProd && !IS_STORYBOOK && (
          <ProjectSettingsDiv>
            <p>These fields are shown on non-production env only.</p>
            <label>
              Capacity
              <input
                {...register('capacity')}
                type="number"
                defaultValue={DEFAULT_CAPACITY}
              />
            </label>
            <label>
              Period seconds
              <input
                {...register('periodSeconds')}
                type="number"
                defaultValue={DEFAULT_PERIOD_SECONDS}
              />
            </label>
          </ProjectSettingsDiv>
        )}
        <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
        <SubmitButton />
      </Form>
    </>
  )
}
const SubmitButton = styled(({ className }) => {
  const { watch } = useFormContext<RaisingFormData>()
  const { image, title = '', description = '' } = watch()
  const isSubmittable =
    image &&
    title.length > 0 &&
    title.length <= 30 &&
    description.length > 0 &&
    description.length <= 800
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
  height: 156px;
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
