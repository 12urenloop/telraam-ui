import React, { FC } from 'react';
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ModalProvider } from '../context/modal.context';
import { BatonProvider } from '../context/batons.context';
import { TeamProvider } from '../context/teams.context';
import { StationProvider } from '../context/stations.context';
import { GeneralProvider } from '../context/general.context';
import { SwitchProvider } from '../context/lapswitch.context';
import { ToastContainer } from '../util';

export const AppProviders: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<ChakraProvider theme={theme}>
			<GeneralProvider>
				<ModalProvider>
					<BatonProvider>
						<TeamProvider>
							<StationProvider>
								<SwitchProvider>
									{children}
									<ToastContainer />
								</SwitchProvider>
							</StationProvider>
						</TeamProvider>
					</BatonProvider>
				</ModalProvider>
			</GeneralProvider>
		</ChakraProvider>
	);
};
