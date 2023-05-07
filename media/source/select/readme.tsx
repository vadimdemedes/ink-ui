import React from 'react';
import {render, Box} from 'ink';
import delay from 'delay';
import {Select} from '../../../source/index.js';
import {upArrow, downArrow} from '../helpers/escapes.js';
import press from '../helpers/press.js';

function Example() {
	return (
		<Box padding={2}>
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
			/>
		</Box>
	);
}

render(<Example />);

await delay(500);
await press(downArrow);
await delay(250);
await press('\r');
await delay(250);
await press(downArrow, 5);
await delay(250);
await press('\r');
await delay(250);
await press(upArrow, 6);
