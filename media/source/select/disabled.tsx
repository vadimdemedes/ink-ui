import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {Select} from '../../../source/index.js';
import {downArrow} from '../helpers/escapes.js';
import press from '../helpers/press.js';

const options = [
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
];

function Example() {
	const [activeInput, setActiveInput] = useState('primary');
	const [primaryColor, setPrimaryColor] = useState<string | undefined>();
	const [secondaryColor, setSecondaryColor] = useState<string | undefined>();

	return (
		<Box padding={2}>
			<Box flexDirection="column" gap={1} width={28}>
				<Select
					isDisabled={activeInput !== 'primary'}
					options={options}
					onChange={value => {
						setPrimaryColor(value);
						setActiveInput('secondary');
					}}
				/>

				<Text>Primary color: {primaryColor}</Text>
			</Box>

			<Box flexDirection="column" gap={1} width={28}>
				<Select
					isDisabled={activeInput !== 'secondary'}
					options={options}
					onChange={value => {
						setSecondaryColor(value);
						setActiveInput('none');
					}}
				/>

				<Text>Secondary color: {secondaryColor}</Text>
			</Box>
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
await delay(1000);
