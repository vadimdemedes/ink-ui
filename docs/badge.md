# Badge

> `Badge` can be used to indicate a status of a certain item, usually positioned nearby the element it's related to.

[Theme](../source/components/badge/theme.ts) | [Example code](../examples/badge.tsx)

## Usage

```tsx
import React from 'react';
import {render, Box} from 'ink';
import {Badge} from '@inkjs/ui';

function Example() {
	return (
		<Box gap={2}>
			<Badge color="green">Pass</Badge>
			<Badge color="red">Fail</Badge>
			<Badge color="yellow">Warn</Badge>
			<Badge color="blue">Todo</Badge>
		</Box>
	);
}

render(<Example />);
```

<img src="../media/badge.png" width="400">

## Props

### children

Type: `ReactNode`

Label.

### color

Type: [`TextProps['color']`](https://github.com/vadimdemedes/ink#color)

Color.
