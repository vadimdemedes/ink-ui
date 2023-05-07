/**
 * Run this example:
 *   npm run example examples/spinner.tsx
 */

import React from 'react';
import {render, Box} from 'ink';
import {Spinner} from '../source/index.js';

function Example() {
	return (
		<Box padding={2}>
			<Spinner label="Loading" />
		</Box>
	);
}

render(<Example />);
