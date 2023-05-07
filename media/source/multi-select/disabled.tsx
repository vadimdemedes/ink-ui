import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import delay from 'delay';
import {MultiSelect} from '../../../source/index.js';
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
	const [primaryColors, setPrimaryColors] = useState<string[]>([]);
	const [secondaryColors, setSecondaryColors] = useState<string[]>([]);

	return (
		<Box padding={2}>
			<Box flexDirection="column" gap={1} width={34}>
				<MultiSelect
					isDisabled={activeInput !== 'primary'}
					options={options}
					onChange={setPrimaryColors}
					onSubmit={() => {
						setActiveInput('secondary');
					}}
				/>

				<Text>Primary colors: {primaryColors.join(', ')}</Text>
			</Box>

			<Box flexDirection="column" gap={1} width={34}>
				<MultiSelect
					isDisabled={activeInput !== 'secondary'}
					options={options}
					onChange={setSecondaryColors}
					onSubmit={() => {
						setActiveInput('none');
					}}
				/>

				<Text>Secondary colors: {secondaryColors.join(', ')}</Text>
			</Box>
		</Box>
	);
}

render(<Example />);

await delay(500);
await press(downArrow);
await delay(250);
await press(' ');
await delay(250);
await press(downArrow, 2);
await delay(250);
await press(' ');
await delay(100);
await press('\r');
await delay(250);
await press(downArrow, 5);
await delay(250);
await press(' ');
await delay(100);
await press('\r');
await delay(1000);
