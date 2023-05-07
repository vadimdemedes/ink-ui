# Unordered list

> `UnorderedList` is used to show lists of items.

[Theme](../source/components/unordered-list/theme.ts) | [Example code](../examples/unordered-list.tsx)

## Usage

```tsx
import React from 'react';
import {render, Box, Text} from 'ink';
import {UnorderedList} from '@inkjs/ui';

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
						<Text>Dark</Text>
					</UnorderedList.Item>
				</UnorderedList>
			</UnorderedList.Item>

			<UnorderedList.Item>
				<Text>Blue</Text>
			</UnorderedList.Item>
		</UnorderedList>
	);
}

render(<Example />);
```

<img src="../media/unordered-list.png" width="400">

## Props

### UnorderedList

#### children

Type: `ReactNode`

List items.

### UnorderedList.Item

#### children

Type: `ReactNode`

List item content.
