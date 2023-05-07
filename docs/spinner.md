# Spinner

> `Spinner` indicates that something is being processed and CLI is waiting for it to complete.

[Theme](../source/components/spinner/theme.ts) | [Example code](../examples/spinner.tsx)

## Usage

```tsx
import React from 'react';
import {render, Box} from 'ink';
import {Spinner} from '@inkjs/ui';

function Example() {
	return <Spinner label="Loading" />;
}

render(<Example />);
```

<img src="../media/spinner.gif" width="400">

## Props

### label

Type: `string`

Label to show next to the spinner.
