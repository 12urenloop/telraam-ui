import { createRoot } from 'react-dom/client';
import theme from './theme';
import { ColorModeScript } from '@chakra-ui/react';
import './index.css';
import { AppProviders } from './components/AppProviders';
import { Wrapper } from './components/wrapper';

const rootElement = document.getElementById('root');
createRoot(rootElement as HTMLElement).render(
	<>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<AppProviders>
			<Wrapper />
		</AppProviders>
	</>
);
