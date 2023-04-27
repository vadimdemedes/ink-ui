import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {MultiSelect} from '../source/index.js';

function Example() {
	const [value, setValue] = useState<string[] | undefined>();

	return (
		<Box>
			{!value && (
				<MultiSelect
					defaultLimit={5}
					options={[
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
					]}
					onSubmit={setValue}
				/>
			)}

			{value && <Text>You've selected {value.join(', ')}</Text>}
		</Box>
	);
}

render(<Example />);
