import React from 'react';
import {render, Box, Text} from 'ink';
import {
	UnorderedList,
	ThemeProvider,
	extendTheme,
	defaultTheme,
} from '../../source/index.js';

const customTheme = extendTheme(defaultTheme, {
	components: {
		UnorderedList: {
			config: () => ({
				marker: '+',
			}),
		},
	},
});

function Example() {
	return (
		<ThemeProvider theme={customTheme}>
			<Box padding={2}>
				<UnorderedList>
					<UnorderedList.Item>
						<Text>Red</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Green</Text>

						<UnorderedList>
							<UnorderedList.Item>
								<Text>Light</Text>
							</UnorderedList.Item>

							<UnorderedList.Item>
								<Text>Dark</Text>
							</UnorderedList.Item>
						</UnorderedList>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Blue</Text>
					</UnorderedList.Item>
				</UnorderedList>
			</Box>
		</ThemeProvider>
	);
}

render(<Example />);
