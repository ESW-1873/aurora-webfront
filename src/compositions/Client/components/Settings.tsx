import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import querystring from 'querystring'
import { useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import { ctaStyle, ErrorMessage, Output } from './styles'

type SettingsProps = {
  contractAddress: string
  setContractAddress: (contractAddress: string) => void
  setAbiJsonStr: (jsonStr: string) => void
}
export const Settings: VFC<SettingsProps> = ({
  contractAddress,
  setAbiJsonStr,
  ...props
}) => {
  const { replace } = useRouter()
  const [abiJsonUrl, setAbiJsonUrl] = useState('')
  const [abiJsonLabel, setAbiJsonLabel] = useState('')
  const [editingAddress, setEditingAddress] = useState('')
  const [abiErrorMessage, setAbiErrorMessage] = useState<any>()
  const [addressErrorMessage, setAddressErrorMessage] = useState('')

  const setContractAddress = (address: string) => {
    if (!ethers.utils.isAddress(address)) {
      setAddressErrorMessage('Invalid address.')
      setEditingAddress(address)
      return
    }
    props.setContractAddress(address)
    setEditingAddress('')
  }

  const updateAbi = (data: any, label: string) => {
    setAbiErrorMessage(undefined)
    try {
      const json = JSON.parse(data)
      if (Array.isArray(json)) {
        setAbiJsonStr(JSON.stringify({ abi: json }))
      } else {
        json.address && setContractAddress(json.address)
        json.abi && setAbiJsonStr(data)
      }
      setAbiJsonLabel(label)
      setAbiJsonUrl('')
    } catch (e) {
      setAbiErrorMessage(e)
    }
  }

  const fetchAbi = async (url: string) =>
    fetch(url).then(
      (res) =>
        res.text().then((data) => {
          updateAbi(data, url)
          replace(`?abiUrl=${encodeURI(url)}`, undefined, { shallow: true })
        }),
      setAbiErrorMessage,
    )

  useEffect(() => {
    const { abiUrl, address } = querystring.parse(
      window.location.search.replace('?', ''),
    )
    const load = async () => {
      if (abiUrl && typeof abiUrl === 'string') await fetchAbi(abiUrl)
      if (address && typeof address === 'string') setContractAddress(address)
    }
    load()
  }, [])

  return (
    <Layout>
      <h2>Settings</h2>
      <Address>
        <h3>Contarct Address</h3>
        <Output>{contractAddress}</Output>
        {addressErrorMessage && (
          <ErrorMessage>{addressErrorMessage}</ErrorMessage>
        )}
        <input
          value={editingAddress}
          onChange={({ target: { value } }) => setEditingAddress(value)}
        />
        <button
          onClick={() => {
            setContractAddress(editingAddress)
          }}
          disabled={!editingAddress}
        >
          Set
        </button>
      </Address>
      <div>
        <h3>ABI</h3>
        <Output>
          {abiJsonLabel.startsWith('http') ? (
            <a href={abiJsonLabel} target="_blank" rel="noreferrer">
              {abiJsonLabel}
            </a>
          ) : (
            abiJsonLabel
          )}
        </Output>
        {abiErrorMessage && (
          <ErrorMessage>
            {JSON.stringify(abiErrorMessage.message, null, 4)}
          </ErrorMessage>
        )}
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
          <button onClick={() => fetchAbi(abiJsonUrl)} disabled={!abiJsonUrl}>
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
  button {
    margin-top: 12px;
    ${ctaStyle};
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
