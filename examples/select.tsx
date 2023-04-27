import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Select} from '../source/index.js';

function Example() {
	const [value, setValue] = useState<string | undefined>();

	return (
		<Box>
			{!value && (
				<Select
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
					onChange={setValue}
				/>
			)}

			{value && <Text>You've selected "{value}"</Text>}
		</Box>
	);
}

render(<Example />);
