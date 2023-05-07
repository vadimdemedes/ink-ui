/**
 * Run this example:
 *   npm run example examples/unordered-list.tsx
 */

import React from 'react';
import {render, Box, Text} from 'ink';
import {UnorderedList} from '../source/index.js';

function Example() {
	return (
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
	);
}

render(<Example />);
