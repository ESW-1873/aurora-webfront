import { memo, useMemo, useState, VFC } from 'react'
import { Header } from 'src/components/Header'
import { useWalletStore } from 'src/stores'
import styled from 'styled-components'
import { Form, Settings } from './components'
import { ABIModel, ContractModel } from './models'

export const Client = () => {
  const [abiJsonStr, setAbiJsonStr] = useState<string>()
  const [contractAddress, setContractAddress] = useState('')
  const { active, currentSigner } = useWalletStore()
  const abi = useMemo(
    () => (abiJsonStr ? new ABIModel(JSON.parse(abiJsonStr)) : undefined),
    [abiJsonStr],
  )
  const contract = useMemo(
    () =>
      contractAddress && abi && currentSigner
        ? new ContractModel({
            address: contractAddress,
            abi: abi.abi,
            signerOrProvider: currentSigner,
          })
        : undefined,
    [contractAddress, abi, currentSigner],
  )
  return (
    <Layout>
      <Header />
      <Settings
        contractAddress={contractAddress}
        setContractAddress={setContractAddress}
        setAbiJsonStr={setAbiJsonStr}
      />
      <ContractForms abi={abi} active={active} call={contract?.call} />
    </Layout>
  )
}

type ContractFormsProps = {
  abi: ABIModel | undefined
  active: boolean | undefined
  call: ((...args: any[]) => Promise<any>) | undefined
}
const ContractForms: VFC<ContractFormsProps> = memo(({ abi, active, call }) => (
  <>
    <h2>PAYABLE</h2>
    {abi?.payables.map((each) => (
      <Form
        key={each.name}
        method={each}
        active={active}
        call={call}
        doc={abi.findDoc(each)}
      />
    ))}
    <h2>NON-PAYABLE</h2>
    {abi?.nonpayables.map((each) => (
      <Form
        key={each.name}
        method={each}
        active={active}
        call={call}
        doc={abi.findDoc(each)}
      />
    ))}
    <h2>VIEW</h2>
    {abi?.views.map((each) => (
      <Form
        key={each.name}
        method={each}
        active={active}
        call={call}
        doc={abi.findDoc(each)}
      />
    ))}
  </>
))

const Layout = styled.div`
  width: 100%;
  padding: 40px;
  max-width: 1260px;
  margin: 0 auto;
  font-size: 16px;
  h2 {
    margin-top: 40px;
    font-size: 32px;
  }
`
