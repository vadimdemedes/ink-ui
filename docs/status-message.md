# Status message

> `StatusMessage` can also be used to indicate a status, but when longer explanation of such status is required.

[Theme](../source/components/status-message/theme.ts) | [Example code](../examples/status-message.tsx)

## Usage

```tsx
import React from 'react';
import {render, Box} from 'ink';
import {StatusMessage} from '@inkjs/ui';

function Example() {
	return (
		<Box flexDirection="column" padding={2}>
			<StatusMessage variant="success">Success</StatusMessage>
			<StatusMessage variant="error">Error</StatusMessage>
			<StatusMessage variant="warning">Warning</StatusMessage>
			<StatusMessage variant="info">Info</StatusMessage>
		</Box>
	);
}

render(<Example />);
```

<img src="../media/status-message.png" width="400">

## Props

### children

Type: `ReactNode`

Message.

### variant

Type: `'info' | 'success' | 'error' | 'warning'`

Variant, which determines the color used in the status message.
