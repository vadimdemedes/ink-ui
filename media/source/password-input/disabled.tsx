import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {PasswordInput} from '../../../source/index.js';
import input from '../helpers/input.js';
import press from '../helpers/press.js';

function Example() {
	const [activeInput, setActiveInput] = useState('password');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<Box flexDirection="column">
				<PasswordInput
					isDisabled={activeInput !== 'password'}
					placeholder="Enter password..."
					onChange={setPassword}
					onSubmit={() => {
						setActiveInput('passwordConfirmation');
					}}
				/>

				<PasswordInput
					isDisabled={activeInput !== 'passwordConfirmation'}
					placeholder="Confirm password..."
					onChange={setPasswordConfirmation}
					onSubmit={() => {
						setActiveInput('none');
					}}
				/>
			</Box>

			<Box flexDirection="column">
				<Text>Password: "{password}"</Text>
				<Text>Password confirmation: "{passwordConfirmation}"</Text>
			</Box>
		</Box>
	);
}

render(<Example />);

await delay(500);
await input('secret');
await delay(250);
await press('\r');
await delay(250);
await input('secret');
await delay(250);
await press('\r');
await delay(1000);
