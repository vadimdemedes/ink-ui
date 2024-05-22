/* eslint-disable no-await-in-loop */
import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import delay from 'delay';
import {catNames} from 'cat-names';
import {TextInput} from '../source/index.js';

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
	const {lastFrame} = render(<TextInput placeholder="Start typing..." />);

	t.is(lastFrame(), cursor('S') + chalk.dim('tart typing...'));
});

test("cursor can't be moved in placeholder", async t => {
	const {lastFrame, stdin} = render(
		<TextInput placeholder="Start typing..." />,
	);

	await delay(50);
	stdin.write(arrowLeft);
	await delay(50);

	t.is(lastFrame(), cursor('S') + chalk.dim('tart typing...'));

	await delay(50);
	stdin.write(arrowRight);
	await delay(50);

	t.is(lastFrame(), cursor('S') + chalk.dim('tart typing...'));
});

test('hide cursor in placeholder when disabled', t => {
	const {lastFrame} = render(
		<TextInput isDisabled placeholder="Start typing..." />,
	);

	t.is(lastFrame(), chalk.dim('Start typing...'));
});

test('default value', t => {
	const {lastFrame} = render(
		<TextInput defaultValue="Test" placeholder="Start typing..." />,
	);

	t.is(lastFrame(), `Test${cursor()}`);
});

test('hide cursor in value when disabled', t => {
	const {lastFrame} = render(
		<TextInput isDisabled defaultValue="Test" placeholder="Start typing..." />,
	);

	t.is(lastFrame(), 'Test');
});

test('insert character', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<TextInput
			placeholder="Start typing..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('T');
	await delay(50);

	t.is(lastFrame(), `T${cursor()}`);
	t.is(value, 'T');
});

test('insert text', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<TextInput
			placeholder="Start typing..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('Test');
	await delay(50);

	t.is(lastFrame(), `Test${cursor()}`);
	t.is(value, 'Test');
});

test('ignore input when disabled', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<TextInput
			isDisabled
			placeholder="Start typing..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('T');
	await delay(50);

	t.is(lastFrame(), chalk.dim('Start typing...'));
	t.is(value, undefined);
});

test('delete character', async t => {
	let value = 'Test';

	const {lastFrame, stdin} = render(
		<TextInput
			defaultValue={value}
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write(del);
	await delay(50);

	t.is(lastFrame(), `Tes${cursor()}`);
	t.is(value, 'Tes');
});

test('delete all text', async t => {
	let value = 'Test';

	const {lastFrame, stdin} = render(
		<TextInput
			defaultValue={value}
			placeholder="Start typing..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	for (let press = 0; press < 4; press++) {
		await delay(50);
		stdin.write(del);
		await delay(50);
	}

	t.is(lastFrame(), cursor('S') + chalk.dim('tart typing...'));
	t.is(value, '');
});

test('move cursor to the left', async t => {
	const {lastFrame, stdin} = render(<TextInput defaultValue="Test" />);

	for (let at = 3; at >= 0; at--) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);

		t.is(lastFrame(), cursorAt('Test', at));
	}
});

test("cursor can't be moved left when at the beginning of the input", async t => {
	const {lastFrame, stdin} = render(<TextInput defaultValue="Test" />);

	for (let press = 0; press < 5; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), cursorAt('Test', 0));
});

test('move cursor to the right', async t => {
	const {lastFrame, stdin} = render(<TextInput defaultValue="Test" />);

	for (let press = 0; press < 4; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), cursorAt('Test', 0));

	for (let at = 1; at < 4; at++) {
		await delay(50);
		stdin.write(arrowRight);
		await delay(50);

		t.is(lastFrame(), cursorAt('Test', at));
	}

	await delay(50);
	stdin.write(arrowRight);
	await delay(50);

	t.is(lastFrame(), `Test${cursor()}`);
});

test("cursor can't be moved right when at the end of the input", async t => {
	const {lastFrame, stdin} = render(<TextInput defaultValue="Test" />);

	t.is(lastFrame(), `Test${cursor()}`);

	await delay(50);
	stdin.write(arrowRight);
	await delay(50);

	t.is(lastFrame(), `Test${cursor()}`);
});

test('insert character in the middle', async t => {
	let value = 'Hllo';

	const {lastFrame, stdin} = render(
		<TextInput
			defaultValue={value}
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	t.is(lastFrame(), `Hllo${cursor()}`);

	for (let press = 0; press < 3; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), `H${cursor('l')}lo`);

	await delay(50);
	stdin.write('e');
	await delay(50);

	t.is(lastFrame(), `He${cursor('l')}lo`);
	t.is(value, 'Hello');
});

test('insert text in the middle', async t => {
	let value = 'Hllo';

	const {lastFrame, stdin} = render(
		<TextInput
			defaultValue={value}
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	t.is(lastFrame(), `Hllo${cursor()}`);

	for (let press = 0; press < 3; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), `H${cursor('l')}lo`);

	await delay(50);
	stdin.write('eee');
	await delay(50);

	t.is(lastFrame(), `Heee${cursor('l')}lo`);
	t.is(value, 'Heeello');
});

test('autocomplete', async t => {
	let value: string | undefined;
	let submittedValue: string | undefined;

	const {lastFrame, stdin} = render(
		<TextInput
			placeholder="Start typing..."
			suggestions={catNames as string[]}
			onChange={newValue => {
				value = newValue;
			}}
			onSubmit={newValue => {
				submittedValue = newValue;
			}}
		/>,
	);

	t.is(lastFrame(), cursor('S') + chalk.dim('tart typing...'));

	await delay(50);
	stdin.write('A');
	await delay(50);

	t.is(lastFrame(), `A${cursor('b')}${chalk.dim('by')}`);
	t.is(value, 'A');

	await delay(50);
	stdin.write('b');
	await delay(50);

	t.is(lastFrame(), `Ab${cursor('b')}${chalk.dim('y')}`);
	t.is(value, 'Ab');

	await delay(50);
	stdin.write('b');
	await delay(50);

	t.is(lastFrame(), `Abb${cursor('y')}`);
	t.is(value, 'Abb');

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.is(lastFrame(), `Abby${cursor()}`);
	t.is(value, 'Abby');
	t.is(submittedValue, 'Abby');
});

test('submit on enter', async t => {
	let submittedValue: string | undefined;

	const {stdin} = render(
		<TextInput
			defaultValue="Test"
			onSubmit={value => {
				submittedValue = value;
			}}
		/>,
	);

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.is(submittedValue, 'Test');
});
