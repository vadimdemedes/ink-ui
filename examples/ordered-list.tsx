import React from 'react';
import {render, Text} from 'ink';
import {OrderedList} from '../source/index.js';

function Example() {
	return (
		<OrderedList>
			<OrderedList.Item>
				<Text>Red</Text>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Green</Text>

				<OrderedList>
					<OrderedList.Item>
						<Text>Light</Text>
					</OrderedList.Item>

					<OrderedList.Item>
						<Text>Normal</Text>
					</OrderedList.Item>

					<OrderedList.Item>
						<Text>Dark</Text>
					</OrderedList.Item>
				</OrderedList>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Yellow</Text>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Blue</Text>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Magenta</Text>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Cyan</Text>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Pink</Text>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Purple</Text>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Orange</Text>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Lime</Text>
			</OrderedList.Item>
		</OrderedList>
	);
}

render(<Example />);
