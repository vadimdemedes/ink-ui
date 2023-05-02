import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import spinners from 'cli-spinners';
import delay from 'delay';
import {Spinner} from '../source/index.js';

test('spinner', async t => {
	const {frames, unmount} = render(<Spinner label="Loading" />);

	const spinner = spinners.dots;
	await delay(spinner.frames.length * spinner.interval);
	unmount();

	t.deepEqual(
		[...new Set(frames)],
		spinner.frames.map(frame => `${frame} Loading`),
	);
});
