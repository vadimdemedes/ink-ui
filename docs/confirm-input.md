# Confirm input

> `ConfirmInput` shows a common "Y/n" input to confirm or cancel an operation your CLI wants to perform.

[Theme](../source/components/confirm-input/theme.ts) | [Example code](../examples/confirm-input.tsx)

## Usage

```tsx
import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {ConfirmInput} from '@inkjs/ui';

function Example() {
	const [choice, setChoice] = useState<'agreed' | 'disagreed' | undefined>();

	return (
		<Box gap={1}>
			{!choice && (
				<>
					<Text bold>Do you agree with terms of service?</Text>
					<ConfirmInput
						onConfirm={() => {
							setChoice('agreed');
						}}
						onCancel={() => {
							setChoice('disagreed');
						}}
					/>
				</>
			)}

			{choice === 'agreed' && <Text>I know you haven't read them, but ok</Text>}
			{choice === 'disagreed' && <Text>Ok, whatever</Text>}
		</Box>
	);
}

render(<Example />);
```

## Props

### isDisabled

Type: `boolean`\
Default: `false`

When disabled, user input is ignored.

### defaultChoice

Type: `'confirm' | 'cancel'`\
Default: `'confirm'`

Default choice.

### submitOnEnter

Type: `boolean`\
Default: `true`

Confirm or cancel when user presses enter, depending on the `defaultChoice` value.
Can be useful to disable when an explicit confirmation is required, such as pressing <kbd>Y</kbd> key.

### onConfirm

Type: `Function`

Callback to trigger on confirmation.

### onCancel

Type: `Function`

Callback to trigger on cancellation.
