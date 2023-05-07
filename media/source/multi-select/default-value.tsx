import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {MultiSelect} from '../../../source/index.js';
import {downArrow} from '../helpers/escapes.js';
import press from '../helpers/press.js';

function Example() {
	const [value, setValue] = useState(['green']);

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<MultiSelect
				defaultValue={value}
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

await delay(500);
await press(downArrow, 2);
await delay(250);
await press(' ');
await delay(250);
await press(downArrow, 5);
await delay(250);
await press(' ');
