import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import delay from 'delay';
import {ConfirmInput} from '../source/index.js';

const enter = '\r';

test('confirm via "Y"', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'Y/n');

	await delay(50);
	stdin.write('Y');
	await delay(50);

	t.true(confirmed);
	t.false(cancelled);
});

test('confirm via "y"', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'Y/n');

	await delay(50);
	stdin.write('y');
	await delay(50);

	t.true(confirmed);
	t.false(cancelled);
});

test('confirm via enter', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'Y/n');

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.true(confirmed);
	t.false(cancelled);
});

test('confirm with disabled enter', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			submitOnEnter={false}
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'Y/n');

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.false(confirmed);
	t.false(cancelled);

	await delay(50);
	stdin.write('y');
	await delay(50);

	t.true(confirmed);
	t.false(cancelled);
});

test('cancel via "N"', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'Y/n');

	await delay(50);
	stdin.write('N');
	await delay(50);

	t.false(confirmed);
	t.true(cancelled);
});

test('cancel via "n"', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'Y/n');

	await delay(50);
	stdin.write('n');
	await delay(50);

	t.false(confirmed);
	t.true(cancelled);
});

test('cancel via enter', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			defaultChoice="cancel"
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'y/N');

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.false(confirmed);
	t.true(cancelled);
});

test('cancel with disabled enter', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			defaultChoice="cancel"
			submitOnEnter={false}
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'y/N');

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.false(confirmed);
	t.false(cancelled);

	await delay(50);
	stdin.write('n');
	await delay(50);

	t.false(confirmed);
	t.true(cancelled);
});

test('unset the default choice, confirm via "y"', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			defaultChoice="unset"
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'y/n');

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.false(confirmed);
	t.false(cancelled);

	await delay(50);
	stdin.write('y');
	await delay(50);

	t.true(confirmed);
	t.false(cancelled);
});

test('unset the default choice, cancle via "n"', async t => {
	let confirmed = false;
	let cancelled = false;

	const {lastFrame, stdin} = render(
		<ConfirmInput
			defaultChoice="unset"
			onConfirm={() => {
				confirmed = true;
			}}
			onCancel={() => {
				cancelled = true;
			}}
		/>,
	);

	t.is(lastFrame(), 'y/n');

	await delay(50);
	stdin.write(enter);
	await delay(50);

	t.false(confirmed);
	t.false(cancelled);

	await delay(50);
	stdin.write('n');
	await delay(50);

	t.false(confirmed);
	t.true(cancelled);
});
