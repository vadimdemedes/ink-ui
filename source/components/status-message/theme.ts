import {type BoxProps, type TextProps} from 'ink';
import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';
import {type StatusMessageVariant} from './types.js';

const colorByVariant = {
	success: 'green',
	error: 'red',
	warning: 'yellow',
	info: 'blue',
};

const iconByVariant = {
	success: figures.tick,
	error: figures.cross,
	warning: figures.warning,
	info: figures.info,
};

const theme = {
	styles: {
		container: (): BoxProps => ({
			gap: 1,
		}),
		iconContainer: (): BoxProps => ({
			flexShrink: 0,
		}),
		icon: ({variant}: {variant: StatusMessageVariant}): TextProps => ({
			color: colorByVariant[variant],
		}),
		message: (): TextProps => ({}),
	},
	config: ({variant}: {variant: StatusMessageVariant}) => ({
		icon: iconByVariant[variant],
	}),
} satisfies ComponentTheme;

export default theme;
export type Theme = typeof theme;
