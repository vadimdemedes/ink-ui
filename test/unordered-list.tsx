import React from 'react';
import test from 'ava';
import {Text} from 'ink';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import {UnorderedList} from '../source/index.js';

test('unordered list', t => {
	const {lastFrame} = render(
		<UnorderedList>
			<UnorderedList.Item>
				<Text>Red</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Green</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Yellow</Text>
			</UnorderedList.Item>
		</UnorderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim('─')} Red`,
			`${chalk.dim('─')} Green`,
			`${chalk.dim('─')} Yellow`,
		].join('\n'),
	);
});

test('custom marker', t => {
	const {lastFrame} = render(
		<UnorderedList marker="+">
			<UnorderedList.Item>
				<Text>Red</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Green</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Yellow</Text>
			</UnorderedList.Item>
		</UnorderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim('+')} Red`,
			`${chalk.dim('+')} Green`,
			`${chalk.dim('+')} Yellow`,
		].join('\n'),
	);
});

test('nested list', t => {
	const {lastFrame} = render(
		<UnorderedList>
			<UnorderedList.Item>
				<Text>Red</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Green</Text>

				<UnorderedList>
					<UnorderedList.Item>
						<Text>Light</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Normal</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Dark</Text>
					</UnorderedList.Item>
				</UnorderedList>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Yellow</Text>
			</UnorderedList.Item>
		</UnorderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim('─')} Red`,
			`${chalk.dim('─')} Green`,
			[
				`${chalk.dim('─')} Light`,
				`${chalk.dim('─')} Normal`,
				`${chalk.dim('─')} Dark`,
			]
				.map(line => `  ${line}`)
				.join('\n'),
			`${chalk.dim('─')} Yellow`,
		].join('\n'),
	);
});

test('custom marker in nested list', t => {
	const {lastFrame} = render(
		<UnorderedList marker="+">
			<UnorderedList.Item>
				<Text>Red</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Green</Text>

				<UnorderedList>
					<UnorderedList.Item>
						<Text>Light</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Normal</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Dark</Text>
					</UnorderedList.Item>
				</UnorderedList>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Yellow</Text>
			</UnorderedList.Item>
		</UnorderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim('+')} Red`,
			`${chalk.dim('+')} Green`,
			[
				`${chalk.dim('+')} Light`,
				`${chalk.dim('+')} Normal`,
				`${chalk.dim('+')} Dark`,
			]
				.map(line => `  ${line}`)
				.join('\n'),
			`${chalk.dim('+')} Yellow`,
		].join('\n'),
	);
});

test('custom markers in nested lists', t => {
	const {lastFrame} = render(
		<UnorderedList marker={['─', '+']}>
			<UnorderedList.Item>
				<Text>Red</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Green</Text>

				<UnorderedList>
					<UnorderedList.Item>
						<Text>Light</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Normal</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Dark</Text>
					</UnorderedList.Item>
				</UnorderedList>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Yellow</Text>
			</UnorderedList.Item>
		</UnorderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim('─')} Red`,
			`${chalk.dim('─')} Green`,
			[
				`${chalk.dim('+')} Light`,
				`${chalk.dim('+')} Normal`,
				`${chalk.dim('+')} Dark`,
			]
				.map(line => `  ${line}`)
				.join('\n'),
			`${chalk.dim('─')} Yellow`,
		].join('\n'),
	);
});

test('overwrite custom markers in nested lists', t => {
	const {lastFrame} = render(
		<UnorderedList marker={['─', '+']}>
			<UnorderedList.Item>
				<Text>Red</Text>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Green</Text>

				<UnorderedList marker="x">
					<UnorderedList.Item>
						<Text>Light</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Normal</Text>
					</UnorderedList.Item>

					<UnorderedList.Item>
						<Text>Dark</Text>
					</UnorderedList.Item>
				</UnorderedList>
			</UnorderedList.Item>
			<UnorderedList.Item>
				<Text>Yellow</Text>
			</UnorderedList.Item>
		</UnorderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim('─')} Red`,
			`${chalk.dim('─')} Green`,
			[
				`${chalk.dim('x')} Light`,
				`${chalk.dim('x')} Normal`,
				`${chalk.dim('x')} Dark`,
			]
				.map(line => `  ${line}`)
				.join('\n'),
			`${chalk.dim('─')} Yellow`,
		].join('\n'),
	);
});
