import React, { createContext, useState } from 'react';

export const SwitchContext = createContext<basicContext<SwitchOver>>({
	list: [],
	setList() {
		return;
	},
});

export const SwitchProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
	const [list, setStateList] = useState<SwitchOver[]>([]);
	const setList = (switchList: SwitchOver[]) => {
		setStateList(switchList);
	};
	return <SwitchContext.Provider value={{ list, setList }}>{children}</SwitchContext.Provider>;
};
