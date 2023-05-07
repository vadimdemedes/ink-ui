import React from 'react';
import {render, Box} from 'ink';
import {ConfirmInput} from '../../../source/index.js';

function Demo() {
	return (
		<Box padding={2}>
			<ConfirmInput
				onConfirm={() => {
					// Confirmed
				}}
				onCancel={() => {
					// Cancelled
				}}
			/>
		</Box>
	);
}

render(<Demo />);
