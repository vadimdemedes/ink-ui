import React from 'react';
import {render, Box} from 'ink';
import delay from 'delay';
import {TextInput} from '../../../source/index.js';
import {leftArrow, rightArrow} from '../helpers/escapes.js';
import input from '../helpers/input.js';
import press from '../helpers/press.js';

function Example() {
	return (
		<Box padding={2}>
			<TextInput placeholder="Start typing..." />
		</Box>
	);
}

render(<Example />);

await delay(500);
await input('Hello world');
await delay(350);
await press(leftArrow, 6);
await delay(350);
await input(',');
await delay(350);
await press(rightArrow, 7);
