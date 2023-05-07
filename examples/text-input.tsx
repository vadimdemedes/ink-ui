/**
 * Run this example:
 *   npm run example examples/text-input.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {TextInput} from '../source/index.js';

function Example() {
	const [value, setValue] = useState('');

	return (
		<Box padding={2} flexDirection="column" gap={1}>
			<TextInput placeholder="Start typing..." onChange={setValue} />
			<Text>Input value: "{value}"</Text>
		</Box>
	);
}

render(<Example />);
