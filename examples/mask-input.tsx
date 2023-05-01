import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {MaskInput} from '../source/index.js';

function Example() {
	const [value, setValue] = useState<string | undefined>();

	return (
		<Box>
			{!value && (
				<MaskInput
					placeholder="DD/MM/YYYY"
					mask="11/11/1111"
					onSubmit={setValue}
				/>
			)}

			{value && <Text>You've entered "{value}"</Text>}
		</Box>
	);
}

render(<Example />);
