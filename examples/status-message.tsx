import React from 'react';
import {render, Box} from 'ink';
import {StatusMessage} from '../source/index.js';

function Example() {
	return (
		<Box flexDirection="column" paddingX={2} width={20}>
			<StatusMessage variant="success">Success</StatusMessage>
			<StatusMessage variant="error">Error</StatusMessage>
			<StatusMessage variant="warning">Warning</StatusMessage>
			<StatusMessage variant="info">Info</StatusMessage>
		</Box>
	);
}

render(<Example />);
