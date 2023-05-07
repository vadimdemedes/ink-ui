# Alert

> `Alert` is used to focus user's attention to important messages.

[Theme](../source/components/alert/theme.ts) | [Example code](../examples/alert.tsx)

## Usage

```tsx
import React from 'react';
import {render, Box} from 'ink';
import {Alert} from '@inkjs/ui';

function Example() {
	return (
		<Box flexDirection="column" width={60} gap={1}>
			<Alert variant="success">A new version of this CLI is available</Alert>

			<Alert variant="error">Your license is expired</Alert>

			<Alert variant="warning">
				Current version of this CLI has been deprecated
			</Alert>

			<Alert variant="info">API won't be available tomorrow night</Alert>
		</Box>
	);
}

render(<Example />);
```

<img src="../media/alert.png" width="600">

## Props

### children

Type: `ReactNode`

Message.

### variant

Type: `'info' | 'success' | 'error' | 'warning'`

Variant, which determines the color of the alert.

### title

Type: `string`

Title to show above the message.
