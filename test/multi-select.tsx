/* eslint-disable no-await-in-loop */
import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import figures from 'figures';
import delay from 'delay';
import {MultiSelect} from '../source/index.js';

const options = [
	{
		label: 'Red',
		value: 'red',
	},
	{
		label: 'Green',
		value: 'green',
	},
	{
		label: 'Yellow',
		value: 'yellow',
	},
	{
		label: 'Blue',
		value: 'blue',
	},
	{
		label: 'Magenta',
		value: 'magenta',
	},
	{
		label: 'Cyan',
		value: 'cyan',
	},
	{
		label: 'White',
		value: 'white',
	},
];

const arrowDown = '\u001B[B';
const arrowUp = '\u001B[A';
const enter = '\r';

test('limit number of visible options', t => {
	const {lastFrame} = render(
		<MultiSelect visibleOptionCount={6} options={options} />,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')}`,
			'  Green',
			'  Yellow',
			'  Blue',
			'  Magenta',
			'  Cyan',
		].join('\n'),
	);
});

test('focus next option', async t => {
	const {lastFrame, stdin} = render(<MultiSelect options={options} />);

	await delay(50);
	stdin.write(arrowDown);
	await delay(50);

	t.is(
		lastFrame(),
		[
			'  Red',
			`${chalk.blue(figures.pointer)} ${chalk.blue('Green')}`,
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);
});

test('focus next option and scroll down', async t => {
	const {lastFrame, stdin} = render(<MultiSelect options={options} />);

	for (let press = 0; press < 6; press++) {
		await delay(50);
		stdin.write(arrowDown);
		await delay(50);
	}

	t.is(
		lastFrame(),
		[
			'  Yellow',
			'  Blue',
			'  Magenta',
			'  Cyan',
			`${chalk.blue(figures.pointer)} ${chalk.blue('White')}`,
		].join('\n'),
	);
});

test("don't scroll down when focused option is the last one", async t => {
	const {lastFrame, stdin} = render(<MultiSelect options={options} />);

	for (let press = 0; press < 7; press++) {
		await delay(50);
		stdin.write(arrowDown);
		await delay(50);
	}

	t.is(
		lastFrame(),
		[
			'  Yellow',
			'  Blue',
			'  Magenta',
			'  Cyan',
			`${chalk.blue(figures.pointer)} ${chalk.blue('White')}`,
		].join('\n'),
	);
});

test('focus previous option', async t => {
	const {lastFrame, stdin} = render(<MultiSelect options={options} />);

	await delay(50);
	stdin.write(arrowDown);
	await delay(50);

	t.is(
		lastFrame(),
		[
			'  Red',
			`${chalk.blue(figures.pointer)} ${chalk.blue('Green')}`,
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);

	await delay(50);
	stdin.write(arrowUp);
	await delay(50);

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')}`,
			'  Green',
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);
});

test('focus previous option and scroll up', async t => {
	const {lastFrame, stdin} = render(<MultiSelect options={options} />);

	for (let press = 0; press < 6; press++) {
		await delay(50);
		stdin.write(arrowDown);
		await delay(50);
	}

	t.is(
		lastFrame(),
		[
			'  Yellow',
			'  Blue',
			'  Magenta',
			'  Cyan',
			`${chalk.blue(figures.pointer)} ${chalk.blue('White')}`,
		].join('\n'),
	);

	for (let press = 0; press < 6; press++) {
		await delay(50);
		stdin.write(arrowUp);
		await delay(50);
	}

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')}`,
			'  Green',
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);
});

test("don't scroll up when focused option is the first one", async t => {
	const {lastFrame, stdin} = render(<MultiSelect options={options} />);

	for (let press = 0; press < 6; press++) {
		await delay(50);
		stdin.write(arrowDown);
		await delay(50);
	}

	t.is(
		lastFrame(),
		[
			'  Yellow',
			'  Blue',
			'  Magenta',
			'  Cyan',
			`${chalk.blue(figures.pointer)} ${chalk.blue('White')}`,
		].join('\n'),
	);

	for (let press = 0; press < 7; press++) {
		await delay(50);
		stdin.write(arrowUp);
		await delay(50);
	}

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')}`,
			'  Green',
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);
});

test('ignore input when disabled', async t => {
	let value: string[] = [];

	const {lastFrame, stdin} = render(
		<MultiSelect
			isDisabled
			options={options}
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	t.is(
		lastFrame(),
		['  Red', '  Green', '  Yellow', '  Blue', '  Magenta'].join('\n'),
	);

	t.deepEqual(value, []);

	await delay(50);
	stdin.write(arrowDown);
	await delay(50);

	t.is(
		lastFrame(),
		['  Red', '  Green', '  Yellow', '  Blue', '  Magenta'].join('\n'),
	);

	t.deepEqual(value, []);

	await delay(50);
	stdin.write(arrowUp);
	await delay(50);

	t.is(
		lastFrame(),
		['  Red', '  Green', '  Yellow', '  Blue', '  Magenta'].join('\n'),
	);

	t.deepEqual(value, []);

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.is(
		lastFrame(),
		['  Red', '  Green', '  Yellow', '  Blue', '  Magenta'].join('\n'),
	);

	t.deepEqual(value, []);
});

test('toggle focused option', async t => {
	let value: string[] = [];

	const {lastFrame, stdin} = render(
		<MultiSelect
			options={options}
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')}`,
			'  Green',
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);

	t.deepEqual(value, []);

	await delay(50);
	stdin.write(' ');
	await delay(50);

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')} ${chalk.green(
				figures.tick,
			)}`,
			'  Green',
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);

	t.deepEqual(value, ['red']);

	await delay(50);
	stdin.write(arrowDown);
	await delay(50);

	t.is(
		lastFrame(),
		[
			`  ${chalk.green('Red')} ${chalk.green(figures.tick)}`,
			`${chalk.blue(figures.pointer)} ${chalk.blue('Green')}`,
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);

	await delay(50);
	stdin.write(' ');
	await delay(50);

	t.is(
		lastFrame(),
		[
			`  ${chalk.green('Red')} ${chalk.green(figures.tick)}`,
			`${chalk.blue(figures.pointer)} ${chalk.blue('Green')} ${chalk.green(
				figures.tick,
			)}`,
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);

	t.deepEqual(value, ['red', 'green']);

	await delay(50);
	stdin.write(' ');
	await delay(50);

	t.is(
		lastFrame(),
		[
			`  ${chalk.green('Red')} ${chalk.green(figures.tick)}`,
			`${chalk.blue(figures.pointer)} ${chalk.blue('Green')}`,
			'  Yellow',
			'  Blue',
			'  Magenta',
		].join('\n'),
	);

	t.deepEqual(value, ['red']);
});

test('selected options by default', t => {
	const {lastFrame} = render(
		<MultiSelect defaultValue={['green', 'magenta']} options={options} />,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')}`,
			`  ${chalk.green('Green')} ${chalk.green(figures.tick)}`,
			'  Yellow',
			'  Blue',
			`  ${chalk.green('Magenta')} ${chalk.green(figures.tick)}`,
		].join('\n'),
	);
});

test('submit selected options', async t => {
	let submittedValue: string[] | undefined;

	const {lastFrame, stdin} = render(
		<MultiSelect
			defaultValue={['green', 'magenta']}
			options={options}
			onSubmit={newValue => {
				submittedValue = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')}`,
			`  ${chalk.green('Green')} ${chalk.green(figures.tick)}`,
			'  Yellow',
			'  Blue',
			`  ${chalk.green('Magenta')} ${chalk.green(figures.tick)}`,
		].join('\n'),
	);

	t.deepEqual(submittedValue, ['green', 'magenta']);
});

test('highlight text in options', t => {
	const {lastFrame} = render(
		<MultiSelect highlightText="l" options={options} />,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.blue(figures.pointer)} ${chalk.blue('Red')}`,
			'  Green',
			`  Ye${chalk.bold('l')}low`,
			`  B${chalk.bold('l')}ue`,
			'  Magenta',
		].join('\n'),
	);
});
