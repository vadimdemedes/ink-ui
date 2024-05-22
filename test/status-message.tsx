import React from 'react';
import test from 'ava';
import {Box} from 'ink';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import figures from 'figures';
import {StatusMessage} from '../source/index.js';

test.failing('success', t => {
	const {lastFrame} = render(
		<StatusMessage variant="success">Success</StatusMessage>,
	);

	t.is(lastFrame(), `${chalk.green(figures.tick)} Success`);
});

test('error', t => {
	const {lastFrame} = render(
		<StatusMessage variant="error">Error</StatusMessage>,
	);

	t.is(lastFrame(), `${chalk.red(figures.cross)} Error`);
});

test.failing('warning', t => {
	const {lastFrame} = render(
		<StatusMessage variant="warning">Warning</StatusMessage>,
	);

	t.is(lastFrame(), `${chalk.yellow(figures.warning)} Warning`);
});

test.failing('info', t => {
	const {lastFrame} = render(
		<StatusMessage variant="info">Info</StatusMessage>,
	);

	t.is(lastFrame(), `${chalk.blue(figures.info)} Info`);
});

test.failing('multiline message', t => {
	const {lastFrame} = render(
		<Box width={8}>
			<StatusMessage variant="info">Hello world</StatusMessage>
		</Box>,
	);

	t.is(
		lastFrame(),
		[`${chalk.blue(figures.info)} Hello`, '  world'].join('\n'),
	);
});
