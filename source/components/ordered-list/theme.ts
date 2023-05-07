import {type BoxProps, type TextProps} from 'ink';
import {type ComponentTheme} from '../../theme.js';

const theme = {
	styles: {
		list: (): BoxProps => ({
			flexDirection: 'column',
		}),
		listItem: (): BoxProps => ({
			gap: 1,
		}),
		marker: (): TextProps => ({
			dimColor: true,
		}),
		content: (): BoxProps => ({
			flexDirection: 'column',
		}),
	},
} satisfies ComponentTheme;

export default theme;
export type Theme = typeof theme;
