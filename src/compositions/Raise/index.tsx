import React, { VFC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BlurredBackground } from 'src/components/Background'
import { LoadingModal } from 'src/components/Modal/LoadingModal'
import { WalletModal } from 'src/components/Modal/WalletModal'
import { SEOProps } from 'src/components/SEO'
import { PageWrapper } from '../PageWrapper'
import { RaisingForm, RaisingFormData } from './RasingForm'

export type RaiseProps = {
  seoProps?: SEOProps
  publish: (data: RaisingFormData) => Promise<any>
}
export const Raise: VFC<RaiseProps> = ({ seoProps, publish }) => {
  const methods = useForm<RaisingFormData>()
  const { watch } = methods
  const imageUrl = watch('image.dataUrl')
  return (
    <>
      <BlurredBackground imageUrl={imageUrl} />
      <PageWrapper {...seoProps}>
        <main>
          <FormProvider {...methods}>
            <RaisingForm publish={publish} />
          </FormProvider>
        </main>
      </PageWrapper>
      <WalletModal />
      <LoadingModal />
    </>
  )
}
