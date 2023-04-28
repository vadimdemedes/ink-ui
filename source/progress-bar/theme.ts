import {type ComponentTheme} from '../theme.js';

const theme: ComponentTheme = {
	parts: ['container', 'complete', 'remaining'],
	baseStyle: {
		container: {
			flexGrow: 1,
			minWidth: 0,
		},
		complete: {
			color: 'magenta',
		},
		remaining: {
			dimColor: true,
		},
	},
};

export default theme;
