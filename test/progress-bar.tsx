import React from 'react';
import test from 'ava';
import {Box} from 'ink';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import figures from 'figures';
import {ProgressBar} from '../source/index.js';

test('progress bar', t => {
	const {lastFrame, rerender} = render(
		<Box width={20}>
			<ProgressBar value={0} />
		</Box>,
	);

	t.is(lastFrame(), chalk.dim(figures.squareLightShade.repeat(20)));

	rerender(
		<Box width={20}>
			<ProgressBar value={50} />
		</Box>,
	);

	t.is(
		lastFrame(),
		chalk.magenta(figures.square.repeat(10)) +
			chalk.dim(figures.squareLightShade.repeat(10)),
	);
});
