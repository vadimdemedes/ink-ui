/**
 * Run this example:
 *   npm run example examples/badge.tsx
 */

import React from 'react';
import {render, Box} from 'ink';
import {Badge} from '../source/index.js';

function Example() {
	return (
		<Box gap={2} padding={2}>
			<Badge color="green">Pass</Badge>
			<Badge color="red">Fail</Badge>
			<Badge color="yellow">Warn</Badge>
			<Badge color="blue">Todo</Badge>
		</Box>
	);
}

render(<Example />);
