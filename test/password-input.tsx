/* eslint-disable no-await-in-loop */
import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import delay from 'delay';
import {PasswordInput} from '../source/index.js';

const cursor = (character = ' ') => chalk.inverse(character);
const enter = '\r';
const arrowLeft = '\u001B[D';
const arrowRight = '\u001B[C';
const del = '\u007F';

const cursorAt = (input: string, at: number): string => {
	return [...input]
		.map((character, index) => {
			return index === at ? cursor(character) : character;
		})
		.join('');
};

test('placeholder', t => {
	const {lastFrame} = render(<PasswordInput placeholder="Enter password..." />);

	t.is(lastFrame(), cursor('E') + chalk.dim('nter password...'));
});

test("cursor can't be moved in placeholder", async t => {
	const {lastFrame, stdin} = render(
		<PasswordInput placeholder="Enter password..." />,
	);

	await delay(50);
	stdin.write(arrowLeft);
	await delay(50);

	t.is(lastFrame(), cursor('E') + chalk.dim('nter password...'));

	await delay(50);
	stdin.write(arrowRight);
	await delay(50);

	t.is(lastFrame(), cursor('E') + chalk.dim('nter password...'));
});

test('hide cursor in placeholder when not focused', t => {
	const {lastFrame} = render(
		<PasswordInput isFocused={false} placeholder="Enter password..." />,
	);

	t.is(lastFrame(), chalk.dim('Enter password...'));
});

test('insert character', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<PasswordInput
			placeholder="Enter password..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('T');
	await delay(50);

	t.is(lastFrame(), `*${cursor()}`);
	t.is(value, 'T');
});

test('insert text', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<PasswordInput
			placeholder="Enter password..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	t.is(lastFrame(), `****${cursor()}`);
	t.is(value, 'Test');
});

test('ignore input when not focused', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<PasswordInput
			isFocused={false}
			placeholder="Enter password..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('T');
	await delay(50);

	t.is(lastFrame(), chalk.dim('Enter password...'));
	t.is(value, undefined);
});

test('delete character', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<PasswordInput
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	t.is(value, 'Test');

	await delay(50);
	stdin.write(del);
	await delay(50);

	t.is(lastFrame(), `***${cursor()}`);
	t.is(value, 'Tes');
});

test('delete all text', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<PasswordInput
			placeholder="Enter password..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	t.is(value, 'Test');

	for (let press = 0; press < 4; press++) {
		await delay(50);
		stdin.write(del);
		await delay(50);
	}

	t.is(lastFrame(), cursor('E') + chalk.dim('nter password...'));
	t.is(value, '');
});

test('move cursor to the left', async t => {
	const {lastFrame, stdin} = render(<PasswordInput />);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	for (let at = 3; at >= 0; at--) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);

		t.is(lastFrame(), cursorAt('****', at));
	}
});

test("cursor can't be moved left when at the beginning of the input", async t => {
	const {lastFrame, stdin} = render(<PasswordInput />);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	for (let press = 0; press < 5; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), cursorAt('****', 0));
});

test('move cursor to the right', async t => {
	const {lastFrame, stdin} = render(<PasswordInput />);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	t.is(lastFrame(), `****${cursor()}`);

	for (let press = 0; press < 4; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), cursorAt('****', 0));

	for (let at = 1; at < 4; at++) {
		await delay(50);
		stdin.write(arrowRight);
		await delay(50);

		t.is(lastFrame(), cursorAt('****', at));
	}

	await delay(50);
	stdin.write(arrowRight);
	await delay(50);

	t.is(lastFrame(), `****${cursor()}`);
});

test("cursor can't be moved right when at the end of the input", async t => {
	const {lastFrame, stdin} = render(<PasswordInput />);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	t.is(lastFrame(), `****${cursor()}`);

	await delay(50);
	stdin.write(arrowRight);
	await delay(50);

	t.is(lastFrame(), `****${cursor()}`);
});

test('insert character in the middle', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<PasswordInput
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('Hllo');
	await delay(50);

	t.is(lastFrame(), `****${cursor()}`);

	for (let press = 0; press < 3; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), `*${cursor('*')}**`);

	await delay(50);
	stdin.write('e');
	await delay(50);

	t.is(lastFrame(), `**${cursor('*')}**`);
	t.is(value, 'Hello');
});

test('insert text in the middle', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<PasswordInput
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('Hllo');
	await delay(50);

	t.is(lastFrame(), `****${cursor()}`);

	for (let press = 0; press < 3; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), `*${cursor('*')}**`);

	await delay(50);
	stdin.write('eee');
	await delay(50);

	t.is(lastFrame(), `****${cursor('*')}**`);
	t.is(value, 'Heeello');
});

test('submit on enter', async t => {
	let submittedValue: string | undefined;

	const {stdin} = render(
		<PasswordInput
			onSubmit={value => {
				submittedValue = value;
			}}
		/>,
	);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.is(submittedValue, 'Test');
});
