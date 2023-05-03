/* eslint-disable no-await-in-loop */
import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import delay from 'delay';
import {EmailInput} from '../source/index.js';

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
	const {lastFrame} = render(<EmailInput placeholder="Start typing..." />);

	t.is(lastFrame(), cursor('S') + chalk.dim('tart typing...'));
});

test("cursor can't be moved in placeholder", async t => {
	const {lastFrame, stdin} = render(
		<EmailInput placeholder="Start typing..." />,
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

test('hide cursor in placeholder when not focused', t => {
	const {lastFrame} = render(
		<EmailInput isFocused={false} placeholder="Start typing..." />,
	);

	t.is(lastFrame(), chalk.dim('Start typing...'));
});

test('default value', t => {
	const {lastFrame} = render(
		<EmailInput defaultValue="test" placeholder="Start typing..." />,
	);

	t.is(lastFrame(), `test${cursor()}`);
});

test('hide cursor in value when not focused', t => {
	const {lastFrame} = render(
		<EmailInput
			isFocused={false}
			defaultValue="test"
			placeholder="Start typing..."
		/>,
	);

	t.is(lastFrame(), 'test');
});

test('insert character', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<EmailInput
			placeholder="Start typing..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('t');
	await delay(50);

	t.is(lastFrame(), `t${cursor()}`);
	t.is(value, 't');
});

test('insert text', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<EmailInput
			placeholder="Start typing..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('test');
	await delay(50);

	t.is(lastFrame(), `test${cursor()}`);
	t.is(value, 'test');
});

test('prevent two "@" characters', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<EmailInput
			placeholder="Start typing..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('test@');
	await delay(50);

	t.is(lastFrame(), `test@${cursor('a')}${chalk.dim('ol.com')}`);
	t.is(value, 'test@');

	await delay(50);
	stdin.write('@');
	await delay(50);

	t.is(lastFrame(), `test@${cursor('a')}${chalk.dim('ol.com')}`);
	t.is(value, 'test@');
});

test('ignore input when not focused', async t => {
	let value: string | undefined;

	const {lastFrame, stdin} = render(
		<EmailInput
			isFocused={false}
			placeholder="Start typing..."
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write('t');
	await delay(50);

	t.is(lastFrame(), chalk.dim('Start typing...'));
	t.is(value, undefined);
});

test('delete character', async t => {
	let value = 'test';

	const {lastFrame, stdin} = render(
		<EmailInput
			defaultValue={value}
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	await delay(50);
	stdin.write(del);
	await delay(50);

	t.is(lastFrame(), `tes${cursor()}`);
	t.is(value, 'tes');
});

test('delete all text', async t => {
	let value = 'test';

	const {lastFrame, stdin} = render(
		<EmailInput
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
	const {lastFrame, stdin} = render(<EmailInput defaultValue="test" />);

	for (let at = 3; at >= 0; at--) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);

		t.is(lastFrame(), cursorAt('test', at));
	}
});

test("cursor can't be moved left when at the beginning of the input", async t => {
	const {lastFrame, stdin} = render(<EmailInput defaultValue="test" />);

	for (let press = 0; press < 5; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), cursorAt('test', 0));
});

test('move cursor to the right', async t => {
	const {lastFrame, stdin} = render(<EmailInput defaultValue="test" />);

	for (let press = 0; press < 4; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), cursorAt('test', 0));

	for (let at = 1; at < 4; at++) {
		await delay(50);
		stdin.write(arrowRight);
		await delay(50);

		t.is(lastFrame(), cursorAt('test', at));
	}

	await delay(50);
	stdin.write(arrowRight);
	await delay(50);

	t.is(lastFrame(), `test${cursor()}`);
});

test("cursor can't be moved right when at the end of the input", async t => {
	const {lastFrame, stdin} = render(<EmailInput defaultValue="test" />);

	t.is(lastFrame(), `test${cursor()}`);

	await delay(50);
	stdin.write(arrowRight);
	await delay(50);

	t.is(lastFrame(), `test${cursor()}`);
});

test('insert character in the middle', async t => {
	let value = 'hllo';

	const {lastFrame, stdin} = render(
		<EmailInput
			defaultValue={value}
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	t.is(lastFrame(), `hllo${cursor()}`);

	for (let press = 0; press < 3; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), `h${cursor('l')}lo`);

	await delay(50);
	stdin.write('e');
	await delay(50);

	t.is(lastFrame(), `he${cursor('l')}lo`);
	t.is(value, 'hello');
});

test('insert text in the middle', async t => {
	let value = 'hllo';

	const {lastFrame, stdin} = render(
		<EmailInput
			defaultValue={value}
			onChange={newValue => {
				value = newValue;
			}}
		/>,
	);

	t.is(lastFrame(), `hllo${cursor()}`);

	for (let press = 0; press < 3; press++) {
		await delay(50);
		stdin.write(arrowLeft);
		await delay(50);
	}

	t.is(lastFrame(), `h${cursor('l')}lo`);

	await delay(50);
	stdin.write('eee');
	await delay(50);

	t.is(lastFrame(), `heee${cursor('l')}lo`);
	t.is(value, 'heeello');
});

test('autocomplete domain', async t => {
	let value: string | undefined;
	let submittedValue: string | undefined;

	const {lastFrame, stdin} = render(
		<EmailInput
			placeholder="Start typing..."
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
	stdin.write('test@');
	await delay(50);

	t.is(lastFrame(), `test@${cursor('a')}${chalk.dim('ol.com')}`);
	t.is(value, 'test@');

	await delay(50);
	stdin.write('a');
	await delay(50);

	t.is(lastFrame(), `test@a${cursor('o')}${chalk.dim('l.com')}`);
	t.is(value, 'test@a');

	await delay(50);
	stdin.write('o');
	await delay(50);

	t.is(lastFrame(), `test@ao${cursor('l')}${chalk.dim('.com')}`);
	t.is(value, 'test@ao');

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.is(lastFrame(), `test@aol.com${cursor()}`);
	t.is(value, 'test@aol.com');
	t.is(submittedValue, 'test@aol.com');
});

test('submit on enter', async t => {
	let submittedValue: string | undefined;

	const {stdin} = render(
		<EmailInput
			defaultValue="test"
			onSubmit={value => {
				submittedValue = value;
			}}
		/>,
	);

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.is(submittedValue, 'test');
});
