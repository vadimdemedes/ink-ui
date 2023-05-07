# Progress bar

> `ProgressBar` is an extended version of [`Spinner`](spinner.md), where it's possible to calculate a progress percentage.

[Theme](../source/components/progress-bar/theme.ts) | [Example code](../examples/progress-bar.tsx)

## Usage

```tsx
import React, {useEffect, useState} from 'react';
import {render, Box} from 'ink';
import {ProgressBar} from '@inkjs/ui';

function Example() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (progress === 100) {
			return;
		}

		const timer = setTimeout(() => {
			setProgress(progress + 1);
		}, 50);

		return () => {
			clearInterval(timer);
		};
	}, [progress]);

	return (
		<Box width={30}>
			<ProgressBar value={progress} />
		</Box>
	);
}

render(<Example />);
```

<img src="../media/progress-bar.gif" width="400">

## Props

### value

Type: `number` \
Minimum: `0` \
Maximum: `100` \
Default: `0`

Progress.
