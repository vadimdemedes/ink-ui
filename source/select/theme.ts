import {ComponentTheme} from '../theme.js';

const theme: ComponentTheme = {
	parts: ['container', 'optionContainer', 'focusIndicator', 'optionLabel'],
	baseStyle: {
		container: {
			flexDirection: 'column',
		},
		optionContainer: ({isFocused, isSelected}) => ({
			gap: 1,
			paddingLeft: isFocused || isSelected ? 0 : 2,
		}),
		focusIndicator: ({isFocused, isSelected}) => {
			let color: string | undefined;

			if (isFocused) {
				color = 'blue';
			}

			if (isSelected) {
				color = 'green';
			}

			return {color};
		},
		optionLabel: ({isFocused, isSelected}) => {
			let color: string | undefined;

			if (isFocused) {
				color = 'blue';
			}

			if (isSelected) {
				color = 'green';
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
