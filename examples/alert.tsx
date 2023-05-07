/**
 * Run this example:
 *   npm run example examples/alert.tsx
 */

import React from 'react';
import {render, Box} from 'ink';
import {Alert} from '../source/index.js';

function Example() {
	return (
		<Box flexDirection="column" padding={2} width={60} gap={1}>
			<Alert variant="success">A new version of this CLI is available</Alert>

			<Alert variant="error">Your license is expired</Alert>

			<Alert variant="warning">
				Current version of this CLI has been deprecated
			</Alert>

			<Alert variant="info">API won't be available tomorrow night</Alert>
		</Box>
	);
}

render(<Example />);
