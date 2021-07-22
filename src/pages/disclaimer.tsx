import { GetStaticProps } from 'next'
import { Disclaimer } from 'src/compositions/documents/Disclaimer'

export const getStaticProps: GetStaticProps = async () => {
  const result = {
    props: {},
  }
  return JSON.parse(JSON.stringify(result))
}

const DisclaimerPage = () => <Disclaimer />

export default DisclaimerPage
