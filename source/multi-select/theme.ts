import {type ComponentTheme} from '../theme.js';

const theme: ComponentTheme = {
	parts: [
		'container',
		'option',
		'selectedIndicator',
		'focusIndicator',
		'label',
	],
	baseStyle: {
		container: {
			flexDirection: 'column',
		},
		option: ({isFocused}) => ({
			gap: 1,
			paddingLeft: isFocused ? 0 : 2,
		}),
		selectedIndicator: {
			color: 'green',
		},
		focusIndicator: {
			color: 'blue',
		},
		label({isFocused, isSelected}) {
			let color: string | undefined;

			if (isSelected) {
				color = 'green';
			}

			if (isFocused) {
				color = 'blue';
			}

			return {color};
		},
	},
	defaultProps: {
		isFocused: false,
		isSelected: false,
	},
};

export default theme;
