import React, {createContext, useState} from "react";

export const TeamContext = React.createContext<TeamContextProps>({
  list: [],
  setList: () => {},
})

export const TeamProvider: React.FC = ({children}) => {
  const [list, setStateList] = useState<Team[]>([]);
  const setList = (batonList: Team[]) => {
    setStateList(batonList);
  }
  return <TeamContext.Provider value={{list, setList}}>{children}</TeamContext.Provider>
}