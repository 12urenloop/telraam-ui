import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
	global: props => ({
		body: {
			color: mode('gray.800', 'whiteAlpha.900')(props),
			bg: mode('white', 'gray.900')(props),
		},
	}),
};

const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const theme = extendTheme({ config, styles });

export default theme;
