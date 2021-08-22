import React, { useEffect, useState, VFC } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { postClient } from 'src/api/postClient'
import { IconImage } from 'src/assets/svgs'
import { BlurredBackground } from 'src/components/Background'
import { PublishButton } from 'src/components/Buttons/CtaButton'
import { Image } from 'src/components/Image'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { useContract } from 'src/external/contract/hooks'
import { defaultShadow, errorColor, purple, white } from 'src/styles/colors'
import {
  fontWeightBold,
  fontWeightRegular,
  fontWeightSemiBold,
} from 'src/styles/font'
import { absoluteFill, flexCenter } from 'src/styles/mixins'
import { readAsDataURLAsync } from 'src/utils/reader'
import styled, { css } from 'styled-components'
import { PageWrapper } from '../PageWrapper'

export type RaiseProps = {
  seoProps?: SEOProps
}
type PostFormData = NonNullable<Parameters<typeof postClient.postPost>['0']>
export const Raise: VFC<RaiseProps> = ({ seoProps }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { raise } = useContract()
  const methods = useForm<PostFormData>()
  const { register, setValue, handleSubmit } = methods
  const publish = async (data: PostFormData) => {
    try {
      const res = await postClient.postPost(data)
      if (!res.data.metadataUrl) throw new Error()
      await raise(res.data.metadataUrl, 1, 1)
    } catch (e) {
      console.error(e)
      setErrorMessage(
        'Something wrong with your request or server. Please check your request or try again later.',
      )
    }
  }
  useEffect(() => {
    register('image')
  }, [register])
  return (
    <>
      <BlurredBackground imageUrl={imagePreviewUrl} />
      <PageWrapper {...seoProps}>
        <main>
          <Form onSubmit={handleSubmit(publish)}>
            <FormProvider {...methods}>
              <UploadImageLabel $hasImage={!!imagePreviewUrl}>
                <input
                  type="file"
                  onChange={async ({ target: { files } }) => {
                    if (!files?.length) return
                    const file = files[0]
                    const dataUrl = await readAsDataURLAsync(file)
                    if (!dataUrl) return
                    setImagePreviewUrl(dataUrl)
                    setValue('image', {
                      data: dataUrl.replace(/data.*base64,/, ''),
                      contentType: file.type,
                    })
                  }}
                  accept="image/*"
                />
                {imagePreviewUrl && <Image src={imagePreviewUrl} alt="" />}
                <UploadCta $hasImage={!!imagePreviewUrl} />
              </UploadImageLabel>
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
              <ErrorMessage visible={!!errorMessage}>
                {errorMessage}
              </ErrorMessage>
              <SubmitButton />
            </FormProvider>
          </Form>
        </main>
      </PageWrapper>
      <WalletModal />
    </>
  )
}
const SubmitButton = styled(({ className }) => {
  const { watch } = useFormContext<PostFormData>()
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
const Wrapper = styled.div``
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
  height: 156px;
  margin-top: 32px;
  resize: none;

  font-size: 64px;
  font-weight: ${fontWeightBold};
`
const DescriptionTextarea = styled(TextareaAutosize)`
  width: 100%;
  height: auto;
  resize: none;

  font-size: 20px;
  font-weight: ${fontWeightRegular};
  line-height: 2;
  letter-spacing: 0.03rem;
`
const ErrorMessage = styled.p<{ visible: boolean }>`
  margin-top: 20px;
  height: 80px;
  color: ${errorColor};
  font-weight: ${fontWeightBold};
  visibility: ${({ visible }) => (visible ? 'visibile' : 'hidden')};
`
const Form = styled.form`
  ${TitleTextarea} {
    margin-top: 32px;
  }
  ${DescriptionTextarea} {
    margin-top: 56px;
  }
  ${SubmitButton} {
    margin-top: 20px;
  }
`
