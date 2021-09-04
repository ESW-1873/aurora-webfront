import { useState } from 'react'
import { flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

const Preview = () => {
  const [image, setImage] = useState('')
  return (
    <Main>
      <label>
        Change image
        <input
          type="file"
          accept="image/*"
          onChange={async ({ target: { files } }) =>
            files && setImage(window.URL.createObjectURL(files[0]))
          }
        />
      </label>
      <div className="flex">
        <div>
          <div>list min(w240 x h200)</div>
          <GitCoinListImage src={image} style={{ width: 240, height: 200 }} />
        </div>
        <div>
          <div> list desktop(w340 x h200)</div>
          <GitCoinListImage src={image} style={{ width: 340, height: 200 }} />
        </div>
        <div>
          <div> list max(w508 x h200)</div>
          <GitCoinListImage src={image} style={{ width: 508, height: 200 }} />
        </div>
        <div>
          <div>detail min(w320 x h290)</div>
          <GitCoinDetailImage src={image} style={{ width: 320, height: 290 }} />
        </div>
      </div>
      <div>
        <div>detail max(w-full x h290)</div>
        <GitCoinDetailImage src={image} style={{ height: 290 }} />
      </div>
    </Main>
  )
}

export default Preview

const Main = styled.main`
  margin-top: 24px;
  ${flexCenter};
  flex-direction: column;
  width: 100%;
  > div {
    ${flexCenter};
    flex-direction: column;
    margin-top: 24px;
    width: 100%;
  }
  .flex {
    display: flex;
    flex-direction: row;
    img {
      margin: 0 20px;
    }
  }
`
const GitCoinListImage = styled.img`
  width: 100%;
  object-fit: cover;
  min-height: 220px;
  min-height: max(9vh, 190px);
`

const GitCoinDetailImage = styled.img`
  width: 100%;
  object-fit: contain;
  min-height: 220px;
  min-height: max(9vh, 190px);
  background-color: black;
`
