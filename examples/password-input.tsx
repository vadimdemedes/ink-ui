/**
 * Run this example:
 *   npm run example examples/password-input.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {PasswordInput} from '../source/index.js';

function Example() {
	const [value, setValue] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<PasswordInput placeholder="Enter password..." onChange={setValue} />
			<Text>Input value: "{value}"</Text>
		</Box>
	);
}

render(<Example />);
