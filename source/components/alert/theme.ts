import {type BoxProps, type TextProps} from 'ink';
import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const colorByVariant: Record<string, string> = {
	info: 'blue',
	success: 'green',
	error: 'red',
	warning: 'yellow',
};

const theme = {
	styles: {
		container: ({variant}): BoxProps => ({
			flexGrow: 1,
			borderStyle: 'round',
			borderColor: colorByVariant[variant],
			gap: 1,
			paddingX: 1,
		}),
		iconContainer: (): BoxProps => ({
			flexShrink: 0,
		}),
		icon: ({variant}): TextProps => ({
			color: colorByVariant[variant],
		}),
		content: (): BoxProps => ({
			flexShrink: 1,
			flexGrow: 1,
			minWidth: 0,
			flexDirection: 'column',
			gap: 1,
		}),
		title: (): TextProps => ({
			bold: true,
		}),
		message: (): TextProps => ({}),
	},
	config({variant}) {
		let icon: string | undefined;

		if (variant === 'info') {
			icon = figures.info;
		}

		if (variant === 'success') {
			icon = figures.tick;
		}

		if (variant === 'error') {
			icon = figures.cross;
		}

		if (variant === 'warning') {
			icon = figures.warning;
		}

		return {icon};
	},
} satisfies ComponentTheme;

export default theme;
export type Theme = typeof theme;
