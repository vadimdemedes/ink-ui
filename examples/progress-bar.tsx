import React, {useEffect, useState} from 'react';
import {render, Box, Text} from 'ink';
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
		<Box gap={1}>
			<ProgressBar progress={progress} />

			<Box width={4}>
				<Text>{progress}%</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
