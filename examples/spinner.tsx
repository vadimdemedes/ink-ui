import React from 'react';
import {render} from 'ink';
import {Spinner} from '../source/index.js';

function Example() {
	return <Spinner label="Loading" />;
}

render(<Example />);
