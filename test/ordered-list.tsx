import React from 'react';
import test from 'ava';
import {Text} from 'ink';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import {OrderedList} from '../source/index.js';

test('ordered list', t => {
	const {lastFrame} = render(
		<OrderedList>
			<OrderedList.Item>
				<Text>Red</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Green</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Yellow</Text>
			</OrderedList.Item>
		</OrderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim('1.')} Red`,
			`${chalk.dim('2.')} Green`,
			`${chalk.dim('3.')} Yellow`,
		].join('\n'),
	);
});

test('nested ordered list', t => {
	const {lastFrame} = render(
		<OrderedList>
			<OrderedList.Item>
				<Text>Red</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Green</Text>

				<OrderedList>
					<OrderedList.Item>
						<Text>Light</Text>
					</OrderedList.Item>

					<OrderedList.Item>
						<Text>Normal</Text>
					</OrderedList.Item>

					<OrderedList.Item>
						<Text>Dark</Text>
					</OrderedList.Item>
				</OrderedList>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Yellow</Text>
			</OrderedList.Item>
		</OrderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim('1.')} Red`,
			`${chalk.dim('2.')} Green`,
			[
				`${chalk.dim('2.1.')} Light`,
				`${chalk.dim('2.2.')} Normal`,
				`${chalk.dim('2.3.')} Dark`,
			]
				.map(line => `   ${line}`)
				.join('\n'),
			`${chalk.dim('3.')} Yellow`,
		].join('\n'),
	);
});

test('indent all list items equally', t => {
	const {lastFrame} = render(
		<OrderedList>
			<OrderedList.Item>
				<Text>One</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Two</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Three</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Four</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Five</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Six</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Seven</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Eight</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Nine</Text>
			</OrderedList.Item>
			<OrderedList.Item>
				<Text>Ten</Text>
			</OrderedList.Item>
		</OrderedList>,
	);

	t.is(
		lastFrame(),
		[
			`${chalk.dim(' 1.')} One`,
			`${chalk.dim(' 2.')} Two`,
			`${chalk.dim(' 3.')} Three`,
			`${chalk.dim(' 4.')} Four`,
			`${chalk.dim(' 5.')} Five`,
			`${chalk.dim(' 6.')} Six`,
			`${chalk.dim(' 7.')} Seven`,
			`${chalk.dim(' 8.')} Eight`,
			`${chalk.dim(' 9.')} Nine`,
			`${chalk.dim('10.')} Ten`,
		].join('\n'),
	);
});
