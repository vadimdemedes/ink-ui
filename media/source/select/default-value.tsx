import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {Select} from '../../../source/index.js';
import {downArrow} from '../helpers/escapes.js';
import press from '../helpers/press.js';

function Example() {
	const [value, setValue] = useState('green');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<Select
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

			<Text>Selected value: {value}</Text>
		</Box>
	);
}

render(<Example />);

await delay(500);
await press(downArrow, 2);
await delay(250);
await press('\r');
await delay(250);
await press(downArrow, 5);
await delay(250);
await press('\r');
