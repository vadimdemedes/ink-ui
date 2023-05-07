import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {EmailInput} from '../../../source/index.js';
import input from '../helpers/input.js';
import press from '../helpers/press.js';

function Example() {
	const [activeInput, setActiveInput] = useState('first');
	const [first, setFirst] = useState('');
	const [second, setSecond] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<Box flexDirection="column">
				<EmailInput
					isDisabled={activeInput !== 'first'}
					placeholder="Enter first email..."
					onChange={setFirst}
					onSubmit={() => {
						setActiveInput('second');
					}}
				/>

				<EmailInput
					isDisabled={activeInput !== 'second'}
					placeholder="Enter second email..."
					onChange={setSecond}
					onSubmit={() => {
						setActiveInput('none');
					}}
				/>
			</Box>

			<Box flexDirection="column">
				<Text>First email: "{first}"</Text>
				<Text>Second email: "{second}"</Text>
			</Box>
		</Box>
	);
}

render(<Example />);

await delay(500);
await input('jane@he');
await delay(250);
await press('\r');
await delay(250);
await input('hopper@he');
await delay(250);
await press('\r');
await delay(1000);
