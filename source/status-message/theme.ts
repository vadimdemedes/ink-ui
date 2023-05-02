import {type ComponentTheme} from '../theme.js';

const theme: ComponentTheme = {
	parts: ['container', 'iconContainer', 'icon', 'message'],
	baseStyle: {
		container: {
			gap: 1,
		},
		iconContainer: {
			flexShrink: 0,
		},
		icon({variant}) {
			let color: string | undefined;

			if (variant === 'info') {
				color = 'blue';
			}

			if (variant === 'success') {
				color = 'green';
			}

			if (variant === 'error') {
				color = 'red';
			}

			if (variant === 'warning') {
				color = 'yellow';
			}

			return {
				flexShrink: 0,
				color,
			};
		},
		message: {},
	},
};

export default theme;
