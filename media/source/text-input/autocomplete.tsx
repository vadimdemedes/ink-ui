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
			<TextInput
				placeholder="Start typing..."
				suggestions={['Abby', 'Angel', 'Annie']}
				onChange={setValue}
			/>

			<Text>Input value: "{value}"</Text>
		</Box>
	);
}

render(<Example />);

await delay(500);
await input('Ab');
await delay(500);
await press('\r');
