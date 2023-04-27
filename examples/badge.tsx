import React from 'react';
import {render, Box} from 'ink';
import {Badge} from '../source/index.js';

function Example() {
	return (
		<Box gap={2} paddingX={2}>
			<Badge color="red">Red</Badge>
			<Badge color="green">Green</Badge>
			<Badge color="yellow">Yellow</Badge>
			<Badge color="blue">Blue</Badge>
			<Badge color="magenta">Magenta</Badge>
			<Badge color="cyan">Cyan</Badge>
			<Badge color="white">White</Badge>
		</Box>
	);
}

render(<Example />);
