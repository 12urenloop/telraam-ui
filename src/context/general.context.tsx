import React, { createContext, useState } from 'react';

const defaultModule: Record<ModuleType, boolean> = {
	batons: true,
	teams: true,
	stations: true,
	lapsourceswitchover: true,
};

export const GeneralContext = createContext<GeneralContext>({
	enabledModules: defaultModule,
	toggleModule() {
		return;
	},
});

export const GeneralProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
	const [enabledModules, setEnabledModules] = useState<Record<ModuleType, boolean>>(defaultModule);
	const toggleModule = (module: ModuleType) => {
		setEnabledModules({
			...enabledModules,
			[module]: !enabledModules[module],
		});
	};
	return <GeneralContext.Provider value={{ enabledModules, toggleModule }}>{children}</GeneralContext.Provider>;
};
