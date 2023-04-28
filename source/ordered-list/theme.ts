import {type ComponentTheme} from '../theme.js';

const theme: ComponentTheme = {
	parts: ['list', 'listItem', 'marker', 'content'],
	baseStyle: {
		list: {
			flexDirection: 'column',
		},
		listItem: {
			gap: 1,
		},
		marker: {
			dimColor: true,
		},
		content: {
			flexDirection: 'column',
		},
	},
};

export default theme;
