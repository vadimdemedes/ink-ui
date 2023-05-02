import React from 'react';
import {render, Box} from 'ink';
import {Alert} from '../source/index.js';

function Example() {
	return (
		<Box flexDirection="column" padding={2} width={40} gap={1}>
			<Alert variant="success" title="Success">
				Message
			</Alert>

			<Alert variant="error" title="Error">
				Message
			</Alert>

			<Alert variant="warning" title="Warning">
				Message
			</Alert>

			<Alert variant="info" title="Info">
				Message
			</Alert>
		</Box>
	);
}

render(<Example />);
