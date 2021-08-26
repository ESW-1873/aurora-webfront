import { useState, VFC } from 'react'
import styled from 'styled-components'
import { ctaStyle, Output } from './styles'

type SettingsProps = {
  contractAddress: string
  setContractAddress: (contractAddress: string) => void
  setAbiJsonStr: (jsonStr: string) => void
}
export const Settings: VFC<SettingsProps> = ({
  contractAddress,
  setContractAddress,
  setAbiJsonStr,
}) => {
  const [abiJsonUrl, setAbiJsonUrl] = useState('')
  const [abiJsonLabel, setAbiJsonLabel] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const updateAbi = (data: any, label: string) => {
    const json = JSON.parse(data)
    if (Array.isArray(json)) {
      setAbiJsonStr(data)
    } else {
      json.address && setContractAddress(json.address)
      json.abi && setAbiJsonStr(JSON.stringify(json.abi))
    }
    setAbiJsonLabel(label)
    setAbiJsonUrl('')
  }
  return (
    <Layout>
      <h2>Settings</h2>
      <Address>
        <h3>Contarct Address</h3>
        <input
          value={contractAddress}
          onChange={({ target: { value } }) => setContractAddress(value)}
        />
      </Address>
      <div>
        <h3>ABI</h3>
        <Output>{abiJsonLabel}</Output>
        <AbiControl>
          <label>
            Upload
            <input
              type="file"
              onChange={({ target: { files } }) => {
                if (!files?.length) return
                const file = files[0]
                file.text().then((data) => updateAbi(data, file.name))
              }}
              hidden
            />
          </label>
          or
          <button
            onClick={() =>
              fetch(abiJsonUrl).then((res) =>
                res.text().then((data) => updateAbi(data, abiJsonUrl)),
              )
            }
            disabled={!abiJsonUrl}
          >
            Load
          </button>
          from URL:
          <input
            value={abiJsonUrl}
            onChange={({ target: { value } }) => setAbiJsonUrl(value)}
          />
        </AbiControl>
      </div>
    </Layout>
  )
}
const Layout = styled.div`
  h3 {
    margin-top: 16px;
    font-size: 24px;
  }
  input {
    border: 1px solid;
    padding: 4px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
const Address = styled.div`
  input {
    margin-top: 12px;
    display: block;
    width: 100%;
    padding: 4px 8px;
  }
`
const AbiControl = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  > * {
    margin: 0 8px;
  }
  input {
    flex: 1;
  }
  label,
  button {
    ${ctaStyle};
  }
`
