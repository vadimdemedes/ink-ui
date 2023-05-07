/**
 * Run this example:
 *   npm run example examples/ordered-list.tsx
 */

import React from 'react';
import {render, Box, Text} from 'ink';
import {OrderedList} from '../source/index.js';

function Example() {
	return (
		<Box padding={2}>
			<OrderedList>
				<OrderedList.Item>
					<Text>Red</Text>
				</OrderedList.Item>

				<OrderedList.Item>
					<Text>Green</Text>

					<OrderedList>
						<OrderedList.Item>
							<Text>Light</Text>
						</OrderedList.Item>

						<OrderedList.Item>
							<Text>Dark</Text>
						</OrderedList.Item>
					</OrderedList>
				</OrderedList.Item>

				<OrderedList.Item>
					<Text>Blue</Text>
				</OrderedList.Item>
			</OrderedList>
		</Box>
	);
}

render(<Example />);
