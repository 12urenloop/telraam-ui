import React from 'react';
import './styles/reset.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Wrapper } from './components/wrapper';
import theme from './theme';
import { ModalProvider } from './context/modal.context';
import { BatonProvider } from './context/batons.context';
import { TeamProvider } from './context/teams.context';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<ModalProvider>
				<BatonProvider>
					<TeamProvider>
						<Wrapper />
					</TeamProvider>
				</BatonProvider>
			</ModalProvider>
		</ChakraProvider>
	);
}

export default App;
