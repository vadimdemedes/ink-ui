# Ordered list

> `OrderedList` is used to show lists of numbered items.

[Theme](../source/components/ordered-list/theme.ts) | [Example code](../examples/ordered-list.tsx)

## Usage

```tsx
import React from 'react';
import {render, Box, Text} from 'ink';
import {OrderedList} from '@inkjs/ui';

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
						<Text>Dark</Text>
					</OrderedList.Item>
				</OrderedList>
			</OrderedList.Item>

			<OrderedList.Item>
				<Text>Blue</Text>
			</OrderedList.Item>
		</OrderedList>
	);
}

render(<Example />);
```

<img src="../media/ordered-list.png" width="400">

## Props

### OrderedList

#### children

Type: `ReactNode`

List items.

### OrderedList.Item

#### children

Type: `ReactNode`

List item content.
