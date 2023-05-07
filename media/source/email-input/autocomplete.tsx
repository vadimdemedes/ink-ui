import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {EmailInput} from '../../../source/index.js';
import input from '../helpers/input.js';
import press from '../helpers/press.js';

function Example() {
	const [value, setValue] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<EmailInput
				placeholder="Enter email..."
				domains={['example.com', 'example.org']}
				onChange={setValue}
			/>

			<Text>Input value: "{value}"</Text>
		</Box>
	);
}

render(<Example />);

await delay(500);
await input('jane@');
await delay(500);
await press('\r');
