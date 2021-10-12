import React, {createContext, useState} from "react";

export const BatonContext = React.createContext<BatonContextProps>({
  list: [],
  setList: () => {},
})

export const BatonProvider: React.FC = ({children}) => {
  const [list, setStateList] = useState<Baton[]>([]);
  const setList = (batonList: Baton[]) => {
    setStateList(batonList);
  }
  return <BatonContext.Provider value={{list, setList}}>{children}</BatonContext.Provider>
}