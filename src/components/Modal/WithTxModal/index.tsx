import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  VFC,
} from 'react'
import { Modal } from '..'
import { Confirmation } from './Confirmation'
import { Submitted } from './Submitted'
import { TxError } from './TxError'

type WithTxModalContextProps = {
  setLoading: Dispatch<SetStateAction<boolean>>
  onSuccess: () => void
  onFail: (error: any) => void
  close: () => void
}

const WithTxModalContext = createContext<WithTxModalContextProps>({
  setLoading: () => {},
  onSuccess: () => {},
  onFail: () => {},
  close: () => {},
})
export const useWithTxModalContext = () => useContext(WithTxModalContext)

type WithTxModalProps = {
  isOpen: boolean
  close: () => void
  children: ReactNode
  isEscapeDisabled?: boolean
}

export const WithTxModal: VFC<WithTxModalProps> = ({
  isOpen,
  close,
  isEscapeDisabled,
  children,
}) => {
  const [loading, setLoading] = useState(false)
  const [submitted, setsubmitted] = useState(false)
  const [error, setError] = useState()
  const onSuccess = () => {
    setLoading(false)
    setsubmitted(true)
  }
  const onFail = (error: any) => {
    setLoading(false)
    setError(error)
  }
  const onClose = () => {
    close()
    setError(undefined)
    setsubmitted(false)
  }

  const getlModalContent = () => {
    if (error) {
      return <TxError error={error} />
    }
    if (loading) {
      return <Confirmation />
    }
    if (submitted) {
      return <Submitted close={onClose} />
    }
    return children
  }
  return (
    <Modal isOpen={isOpen} closeModal={isEscapeDisabled ? undefined : onClose}>
      <WithTxModalContext.Provider
        value={{ setLoading, onSuccess, onFail, close: onClose }}
      >
        {getlModalContent()}
      </WithTxModalContext.Provider>
    </Modal>
  )
}
