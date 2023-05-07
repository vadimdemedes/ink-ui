import {type BoxProps, type TextProps} from 'ink';
import figures from 'figures';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		container: (): BoxProps => ({
			flexGrow: 1,
			minWidth: 0,
		}),
		completed: (): TextProps => ({
			color: 'magenta',
		}),
		remaining: (): TextProps => ({
			dimColor: true,
		}),
	},
	config: () => ({
		// Character for rendering a completed bar
		completedCharacter: figures.square,

		// Character for rendering a remaining bar
		remainingCharacter: figures.squareLightShade,
	}),
} satisfies ComponentTheme;

export default theme;
export type Theme = typeof theme;
