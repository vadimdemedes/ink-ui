/**
 * Run this example:
 *   npm run example examples/multi-select.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {MultiSelect} from '../source/index.js';

function Example() {
	const [value, setValue] = useState<string[]>([]);

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<MultiSelect
				options={[
					{
						label: 'Red',
						value: 'red',
					},
					{
						label: 'Green',
						value: 'green',
					},
					{
						label: 'Yellow',
						value: 'yellow',
					},
					{
						label: 'Blue',
						value: 'blue',
					},
					{
						label: 'Magenta',
						value: 'magenta',
					},
					{
						label: 'Cyan',
						value: 'cyan',
					},
					{
						label: 'White',
						value: 'white',
					},
				]}
				onChange={setValue}
			/>

			<Text>Selected values: {value.join(', ')}</Text>
		</Box>
	);
}

render(<Example />);
