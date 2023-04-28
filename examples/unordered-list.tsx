import React from 'react';
import {render, Text} from 'ink';
import {UnorderedList} from '../source/index.js';

function Example() {
	return (
		<UnorderedList>
			<UnorderedList.Item>
				<Text>Red</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Green</Text>

				<UnorderedList>
					<UnorderedList.Item>
						<Text>Light</Text>
					</UnorderedList.Item>
					<UnorderedList.Item>
						<Text>Normal</Text>
					</UnorderedList.Item>
					<UnorderedList.Item>
						<Text>Dark</Text>
					</UnorderedList.Item>
				</UnorderedList>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Yellow</Text>
			</UnorderedList.Item>
		</UnorderedList>
	);
}

render(<Example />);
