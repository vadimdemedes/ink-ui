import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {TextInput} from '../../../source/index.js';
import input from '../helpers/input.js';
import press from '../helpers/press.js';

function Example() {
	const [activeInput, setActiveInput] = useState('name');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<Box flexDirection="column">
				<TextInput
					isDisabled={activeInput !== 'name'}
					placeholder="Enter your name..."
					onChange={setName}
					onSubmit={() => {
						setActiveInput('surname');
					}}
				/>

				<TextInput
					isDisabled={activeInput !== 'surname'}
					placeholder="Enter your surname..."
					onChange={setSurname}
					onSubmit={() => {
						setActiveInput('none');
					}}
				/>
			</Box>

			<Box flexDirection="column">
				<Text>Name: "{name}"</Text>
				<Text>Surname: "{surname}"</Text>
			</Box>
		</Box>
	);
}

render(<Example />);

await delay(500);
await input('Jane');
await delay(250);
await press('\r');
await delay(250);
await input('Hopper');
await delay(250);
await press('\r');
await delay(1000);
