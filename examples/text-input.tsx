import React, {useEffect, useState} from 'react';
import {render, Box, Text} from 'ink';
import {TextInput} from '../source/index.js';

function Example() {
	const [value, setValue] = useState<string | undefined>();

	return (
		<Box>
			{!value && (
				<TextInput placeholder="Start typing..." onSubmit={setValue} />
			)}

			{value && <Text>You've entered "{value}"</Text>}
		</Box>
	);
}

render(<Example />);
