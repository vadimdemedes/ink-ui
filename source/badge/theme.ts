import {type ComponentTheme} from '../theme.js';

const theme: ComponentTheme = {
	parts: ['root', 'label'],
	baseStyle: {
		root: ({color}) => ({
			backgroundColor: color,
		}),
		label: {
			color: 'black',
		},
	},
};

export default theme;
