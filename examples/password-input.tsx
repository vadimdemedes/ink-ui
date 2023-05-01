import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {PasswordInput} from '../source/index.js';

function Example() {
	const [value, setValue] = useState<string | undefined>();

	return (
		<Box>
			{!value && (
				<PasswordInput placeholder="Enter a password..." onSubmit={setValue} />
			)}

			{value && <Text>You've entered "{value}"</Text>}
		</Box>
	);
}

render(<Example />);
