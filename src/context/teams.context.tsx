import React, { createContext, useState } from 'react';

export const TeamContext = createContext<TeamContextProps>({
	list: [],
	setList() {
		return;
	},
});

export const TeamProvider: React.FC = ({ children }) => {
	const [list, setStateList] = useState<Team[]>([]);
	const setList = (batonList: Team[]) => {
		setStateList(batonList);
	};
	return <TeamContext.Provider value={{ list, setList }}>{children}</TeamContext.Provider>;
};
