/**
 * Run this example:
 *   npm run example examples/autocomplete.tsx
 */

import React, {useMemo, useState} from 'react';
import {render, Box, Text} from 'ink';
import {TextInput, Select} from '../source/index.js';

function Example() {
	const [filterText, setFilterText] = useState('');
	const [value, setValue] = useState<string | undefined>();

	const options = useMemo(() => {
		return [
			{
				label: 'Red',
				value: 'red',
			},
			{
				label: 'Green',
				value: 'green',
			},
			{
				label: 'Yellow',
				value: 'yellow',
			},
			{
				label: 'Blue',
				value: 'blue',
			},
			{
				label: 'Magenta',
				value: 'magenta',
			},
			{
				label: 'Cyan',
				value: 'cyan',
			},
			{
				label: 'White',
				value: 'white',
			},
		].filter(option => option.label.includes(filterText));
	}, [filterText]);

	return (
		<Box flexDirection="column" gap={1}>
			{!value && (
				<>
					<TextInput onChange={setFilterText} />

					<Select
						defaultLimit={5}
						highlightText={filterText}
						options={options}
						onChange={setValue}
					/>
				</>
			)}

			{value && <Text>You've selected {value}</Text>}
		</Box>
	);
}

render(<Example />);
