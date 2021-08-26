import { useState, VFC } from 'react'

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
  return (
    <div>
      <div>
        Contarct Address: {contractAddress}{' '}
        <input
          value={contractAddress}
          onChange={({ target: { value } }) => setContractAddress(value)}
        />
      </div>
      <div>
        ABI: {abiJsonLabel}
        <div>
          from URL:
          <input
            value={abiJsonUrl}
            onChange={({ target: { value } }) => setAbiJsonUrl(value)}
          />
          <button
            onClick={() =>
              fetch(abiJsonUrl).then((res) =>
                res.text().then((data) => {
                  const json = JSON.parse(data)
                  if (Array.isArray(json)) {
                    setAbiJsonStr(data)
                  } else {
                    json.address && setContractAddress(json.address)
                    json.abi && setAbiJsonStr(JSON.stringify(json.abi))
                  }
                  setAbiJsonLabel(abiJsonUrl)
                  setAbiJsonUrl('')
                }),
              )
            }
          >
            Load
          </button>
        </div>
        or
        <div>
          <label>
            Upload
            <input
              type="file"
              onChange={({ target: { files } }) => {
                if (!files) return
                const filename = files[0]
                filename.text().then((data) => {
                  const json = JSON.parse(data)
                  if (Array.isArray(json)) {
                    setAbiJsonStr(data)
                  } else {
                    json.address && setContractAddress(json.address)
                    json.abi && setAbiJsonStr(JSON.stringify(json.abi))
                  }
                  setAbiJsonLabel(filename.name)
                })
              }}
              hidden
            />
          </label>
        </div>
      </div>
    </div>
  )
}
