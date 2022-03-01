import React, { createContext, useState } from 'react';

export const BatonContext = createContext<BaseEntryContextProps>({
	list: [],
	setList() {
		return;
	},
});

export const BatonProvider: React.FC = ({ children }) => {
	const [list, setStateList] = useState<BaseEntry[]>([]);
	const setList = (batonList: BaseEntry[]) => {
		setStateList(batonList);
	};
	return <BatonContext.Provider value={{ list, setList }}>{children}</BatonContext.Provider>;
};
