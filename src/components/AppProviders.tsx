import React, { FC } from 'react';
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ModalProvider } from '../context/modal.context';
import { BatonProvider } from '../context/batons.context';
import { TeamProvider } from '../context/teams.context';
import { StationProvider } from '../context/stations.context';

export const AppProviders: FC = ({ children }) => {
	return (
		<ChakraProvider theme={theme}>
			<ModalProvider>
				<BatonProvider>
					<TeamProvider>
						<StationProvider>{children}</StationProvider>
					</TeamProvider>
				</BatonProvider>
			</ModalProvider>
		</ChakraProvider>
	);
};
