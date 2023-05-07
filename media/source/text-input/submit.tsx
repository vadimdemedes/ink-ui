import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {TextInput} from '../../../source/index.js';
import input from '../helpers/input.js';
import press from '../helpers/press.js';

function Example() {
	const [value, setValue] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<TextInput placeholder="Start typing..." onSubmit={setValue} />
			<Text>Input value: "{value}"</Text>
		</Box>
	);
}

render(<Example />);

await delay(500);
await input('Hello world');
await delay(250);
await press('\r');
