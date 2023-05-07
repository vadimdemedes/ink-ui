/**
 * Run this example:
 *   npm run example examples/confirm-input.tsx
 */

import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {ConfirmInput} from '../source/index.js';

function Example() {
	const [choice, setChoice] = useState<'agreed' | 'disagreed' | undefined>();

	return (
		<Box gap={1}>
			{!choice && (
				<>
					<Text bold>Do you agree with terms of service?</Text>
					<ConfirmInput
						onConfirm={() => {
							setChoice('agreed');
						}}
						onCancel={() => {
							setChoice('disagreed');
						}}
					/>
				</>
			)}

			{choice === 'agreed' && <Text>I know you haven't read them, but ok</Text>}
			{choice === 'disagreed' && <Text>Ok, whatever</Text>}
		</Box>
	);
}

render(<Example />);
