import Head from 'next/head'
import React, { useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BlurredBackground } from 'src/components/Background'
import { ImageCropModal } from 'src/components/Modal/ImageCropModal'
import { LoadingModal } from 'src/components/Modal/LoadingModal'
import { SpecificationModal } from 'src/components/Modal/SpecificationModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { useLoadingModalStore, useSpecificationModalStore } from 'src/stores'
import { createGlobalStyle } from 'styled-components'
import { PageWrapper } from '../PageWrapper'
import { RaisingForm, RaisingFormData } from './RasingForm'

const DEFAULT_ERROR_MESSAGE =
  'Something wrong with your request or server. Please check your request or try again later.'

export type { RaisingFormData }

export type RaiseProps = {
  seoProps?: SEOProps
  publish: (data: RaisingFormData) => Promise<any>
}
export const Raise: VFC<RaiseProps> = ({ seoProps, publish }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const { close: closeLoadingModal } = useLoadingModalStore()
  const { close: closeSpecificationModal, open: openSpecificationModal } =
    useSpecificationModalStore()
  const methods = useForm<RaisingFormData>()
  const { watch, handleSubmit } = methods
  const imageUrl = watch('image.dataUrl')
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/bnj3ccw.css" />
      </Head>
      <RaiseStyles />
      <BlurredBackground imageUrl={imageUrl} />
      <PageWrapper {...seoProps} noindex noFooter>
        <main>
          <FormProvider {...methods}>
            <RaisingForm
              submit={openSpecificationModal}
              errorMessage={errorMessage}
            />
          </FormProvider>
        </main>
      </PageWrapper>
      <WalletModal />
      <ImageCropModal />
      <SpecificationModal
        publish={handleSubmit((data) => {
          closeSpecificationModal()
          publish(data).catch((e) => {
            setErrorMessage(typeof e === 'string' ? e : DEFAULT_ERROR_MESSAGE)
            closeLoadingModal()
          })
        })}
      />
      <LoadingModal />
    </>
  )
}

const RaiseStyles = createGlobalStyle`
  html{
    height: 100%;
  }
  body {
   height: 100%;
  }
`
