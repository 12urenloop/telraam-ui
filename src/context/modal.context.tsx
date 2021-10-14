import React, {useState} from 'react'
import {useDisclosure} from "@chakra-ui/react";

export const ModalContext = React.createContext<ModalContextProps>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  info: {
    onClose: () => {},
    inputs: [],
    saveEndpoint: '',
    title: ''
  },
  setInfo: (newInfo: ModalInfo) => {},
})


export const ModalProvider: React.FC = ({children}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [info, setInfoState] = useState<ModalInfo>({
    inputs: [], onClose: (didSave: boolean) => {}, saveEndpoint: "", title: ""
  });
  const setInfo = (newInfo: Partial<ModalInfo>) => {
    setInfoState({...info, ...newInfo})}
  return (
    <ModalContext.Provider value={{
      isOpen,
      onOpen,
      onClose,
      info,
      setInfo
    }}>
      {children}
    </ModalContext.Provider>
  )
}