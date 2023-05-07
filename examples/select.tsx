/**
 * Run this example:
 *   npm run example examples/select.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Select} from '../source/index.js';

function Example() {
	const [value, setValue] = useState<string | undefined>();

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<Select
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

			<Text>Selected value: {value}</Text>
		</Box>
	);
}

render(<Example />);
