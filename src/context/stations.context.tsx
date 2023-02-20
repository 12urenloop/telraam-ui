import React, { createContext, useState } from 'react';

export const StationContext = createContext<StationContextProps>({
	list: [],
	setList() {
		return;
	},
});

export const StationProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
	const [list, setStateList] = useState<Station[]>([]);
	const setList = (stationList: Station[]) => {
		setStateList(stationList);
	};
	return <StationContext.Provider value={{ list, setList }}>{children}</StationContext.Provider>;
};
