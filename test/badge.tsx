import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import chalk from 'chalk';
import {Badge} from '../source/index.js';

test('badge', t => {
	const {lastFrame} = render(<Badge color="green">Success</Badge>);

	t.is(lastFrame(), chalk.bgGreen(` ${chalk.black('SUCCESS')} `));
});
