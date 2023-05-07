import React from 'react';
import {render, Box, type TextProps} from 'ink';
import {
	Spinner,
	ThemeProvider,
	defaultTheme,
	extendTheme,
} from '../../source/index.js';

const customTheme = extendTheme(defaultTheme, {
	components: {
		Spinner: {
			styles: {
				frame: (): TextProps => ({
					color: 'magenta',
				}),
			},
		},
	},
});

function Example() {
	return (
		<ThemeProvider theme={customTheme}>
			<Box padding={2}>
				<Spinner label="Loading" />
			</Box>
		</ThemeProvider>
	);
}

render(<Example />);
