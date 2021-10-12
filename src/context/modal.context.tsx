import React, {useState} from 'react'

export const ModalContext = React.createContext<ModalContextProps>({
  id: 0,
  isOpen: false,
  setOpen: () => {},
  setId: () => {},
  type: 'none',
  setType: () => {},
})

export const ModalProvider: React.FC = ({children}) => {
  const [isOpen, setOpenState] = useState<boolean>(false);
  const [type, setTypeState] = useState<ModalTypes>('none');
  const [id, setIdState] = useState<number>(0);
  const setOpen = (isOpen: boolean) => {
    setOpenState(isOpen);
  }
  const setId = (id: number) => setIdState(id);
  const setType = (type: ModalTypes) => setTypeState(type);
  return <ModalContext.Provider value={{
    isOpen,
    setOpen,
    id,
    setId,
    type,
    setType
  }}>{children}</ModalContext.Provider>
}
