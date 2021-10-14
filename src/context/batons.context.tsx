import React, { createContext, useState } from 'react';

export const BatonContext = createContext<BatonContextProps>({
	list: [],
	setList() {
		return;
	},
});

export const BatonProvider: React.FC = ({ children }) => {
	const [list, setStateList] = useState<Baton[]>([]);
	const setList = (batonList: Baton[]) => {
		setStateList(batonList);
	};
	return <BatonContext.Provider value={{ list, setList }}>{children}</BatonContext.Provider>;
};
