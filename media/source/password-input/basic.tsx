import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {PasswordInput} from '../../../source/index.js';
import input from '../helpers/input.js';

function Example() {
	const [value, setValue] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<PasswordInput placeholder="Enter password..." onChange={setValue} />
			<Text>Input value: "{value}"</Text>
		</Box>
	);
}

render(<Example />);

await delay(500);
await input('secret');
