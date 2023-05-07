import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {EmailInput} from '../../../source/index.js';
import {del} from '../helpers/escapes.js';
import input from '../helpers/input.js';
import press from '../helpers/press.js';

function Example() {
	const [value, setValue] = useState('jane@hey.com');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<EmailInput
				placeholder="Enter email..."
				defaultValue={value}
				onChange={setValue}
			/>

			<Text>Input value: "{value}"</Text>
		</Box>
	);
}

render(<Example />);

await delay(500);
await press(del, 12);
await delay(250);
await input('hopper@he');
await delay(250);
await press('\r');
