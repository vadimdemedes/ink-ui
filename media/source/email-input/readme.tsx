import React from 'react';
import {render, Box} from 'ink';
import delay from 'delay';
import {EmailInput} from '../source/index.js';
import {del} from '../helpers/escapes.js';
import input from '../helpers/input.js';
import press from '../helpers/press.js';

function Demo() {
	return (
		<Box padding={2}>
			<EmailInput placeholder="Enter email..." />
		</Box>
	);
}

render(<Demo />);

await delay(500);
await input('jane@');
await delay(250);
await input('ao');
await delay(250);
await press(del, 2);
await delay(250);
await input('hey');
await delay(250);
await press('\r');
