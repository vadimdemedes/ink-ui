/**
 * Run this example:
 *   npm run example examples/status-message.tsx
 */

import React from 'react';
import {render, Box} from 'ink';
import {StatusMessage} from '../source/index.js';

function Example() {
	return (
		<Box flexDirection="column" padding={2}>
			<StatusMessage variant="success">Success</StatusMessage>
			<StatusMessage variant="error">Error</StatusMessage>
			<StatusMessage variant="warning">Warning</StatusMessage>
			<StatusMessage variant="info">Info</StatusMessage>
		</Box>
	);
}

render(<Example />);
