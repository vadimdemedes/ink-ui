import React from 'react';
import {render, Box} from 'ink';
import delay from 'delay';
import {PasswordInput} from '../../../source/index.js';
import input from '../helpers/input.js';

function Demo() {
	return (
		<Box padding={2}>
			<PasswordInput placeholder="Enter password..." />
		</Box>
	);
}

render(<Demo />);

await delay(500);
await input('Hello world');
