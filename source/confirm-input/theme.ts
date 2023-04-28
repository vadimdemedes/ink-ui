import {type ComponentTheme} from '../theme.js';

const theme: ComponentTheme = {
	parts: ['container'],
	baseStyle: {
		container: ({isFocused}) => ({
			dimColor: !isFocused,
		}),
	},
	defaultProps: {
		isFocused: false,
	},
};

export default theme;
