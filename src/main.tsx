import React from 'react';
import ReactDOM from 'react-dom';
import theme from './theme';
import { ColorModeScript } from '@chakra-ui/react';
import './index.css';
import { AppProviders } from './components/AppProviders';
import { Wrapper } from './components/wrapper';

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<AppProviders>
			<Wrapper />
		</AppProviders>
	</React.StrictMode>,
	document.getElementById('root')
);
