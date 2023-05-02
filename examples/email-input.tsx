import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {EmailInput} from '../source/index.js';

function Example() {
	const [value, setValue] = useState<string | undefined>();

	return (
		<Box>
			{!value && (
				<EmailInput placeholder="Enter your email..." onSubmit={setValue} />
			)}

			{value && <Text>You've entered "{value}"</Text>}
		</Box>
	);
}

render(<Example />);
