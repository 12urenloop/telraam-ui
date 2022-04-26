import React, { FC } from 'react';
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ModalProvider } from '../context/modal.context';
import { BatonProvider } from '../context/batons.context';
import { TeamProvider } from '../context/teams.context';
import { StationProvider } from '../context/stations.context';
import { GeneralProvider } from '../context/general.context';
import { SwitchProvider } from '../context/lapswitch.context';

export const AppProviders: FC = ({ children }) => {
	return (
		<ChakraProvider theme={theme}>
			<GeneralProvider>
				<ModalProvider>
					<BatonProvider>
						<TeamProvider>
							<StationProvider>
								<SwitchProvider>{children}</SwitchProvider>
							</StationProvider>
						</TeamProvider>
					</BatonProvider>
				</ModalProvider>
			</GeneralProvider>
		</ChakraProvider>
	);
};
