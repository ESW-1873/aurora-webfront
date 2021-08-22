import React, { useState, VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BlurredBackground } from 'src/components/Background'
import { LoadingModal } from 'src/components/Modal/LoadingModal'
import { SpecificationModal } from 'src/components/Modal/SpecificationModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
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
  const methods = useForm<RaisingFormData>()
  const { watch, handleSubmit } = methods
  const imageUrl = watch('image.dataUrl')
  return (
    <>
      <BlurredBackground imageUrl={imageUrl} />
      <PageWrapper {...seoProps}>
        <main>
          <FormProvider {...methods}>
            <RaisingForm publish={publish} errorMessage={errorMessage} />
          </FormProvider>
        </main>
      </PageWrapper>
      <WalletModal />
      <SpecificationModal
        publish={handleSubmit((data) =>
          publish(data).catch((e) =>
            setErrorMessage(e?.message || DEFAULT_ERROR_MESSAGE),
          ),
        )}
      />
      <LoadingModal />
    </>
  )
}
