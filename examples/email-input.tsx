/**
 * Run this example:
 *   npm run example examples/email-input.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {EmailInput} from '../source/index.js';

function Example() {
	const [value, setValue] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<EmailInput placeholder="Enter email..." onChange={setValue} />
			<Text>Input value: "{value}"</Text>
		</Box>
	);
}

render(<Example />);
