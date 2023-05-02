import {type ComponentTheme} from '../theme.js';

const colorByVariant: Record<string, string> = {
	info: 'blue',
	success: 'green',
	error: 'red',
	warning: 'yellow',
};

const theme: ComponentTheme = {
	parts: ['container', 'iconContainer', 'icon', 'content', 'title', 'message'],
	baseStyle: {
		container: ({variant}) => ({
			borderStyle: 'round',
			borderColor: colorByVariant[variant],
			gap: 1,
			paddingX: 1,
		}),
		iconContainer: {
			flexShrink: 0,
		},
		icon: ({variant}) => ({
			flexShrink: 0,
			color: colorByVariant[variant],
		}),
		content: {
			flexShrink: 1,
			flexGrow: 1,
			minWidth: 0,
			flexDirection: 'column',
			gap: 1,
		},
		title: {
			bold: true,
		},
		message: {},
	},
};

export default theme;
