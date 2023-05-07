/**
 * Run this example:
 *   npm run example examples/progress-bar.tsx
 */

import React, {useEffect, useState} from 'react';
import {render, Box} from 'ink';
import {ProgressBar} from '../source/index.js';

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
		<Box padding={2} width={30}>
			<ProgressBar value={progress} />
		</Box>
	);
}

render(<Example />);
