# Multi select

> `MultiSelect` is similar to [`Select`](select.md), except user can choose multiple options.

[Theme](../source/components/multi-select/theme.ts) | [Example code](../examples/multi-select.tsx)

## Usage

`MultiSelect` is an uncontrolled component. You can listen to value changes via `onChange` prop.

```tsx
import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {MultiSelect} from '@inkjs/ui';

function Example() {
	const [value, setValue] = useState<string[]>([]);

	return (
		<Box flexDirection="column" gap={1}>
			<MultiSelect
				options={[
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
				]}
				onChange={setValue}
			/>

			<Text>Selected values: {value.join(', ')}</Text>
		</Box>
	);
}

render(<Example />);
```

<img src="../media/multi-select-basic.gif" width="400">

### Default value

Default value can be set via `defaultValue` prop.

```tsx
import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {MultiSelect} from '@inkjs/ui';

function Example() {
	const [value, setValue] = useState(['green']);

	return (
		<Box flexDirection="column" gap={1}>
			<MultiSelect
				defaultValue={value}
				options={[
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
				]}
				onChange={setValue}
			/>

			<Text>Selected values: {value.join(', ')}</Text>
		</Box>
	);
}

render(<Example />);
```

<img src="../media/multi-select-default-value.gif" width="400">

### Submit on enter

When you're only looking for the final value when user presses <kbd>enter</kbd>, you can use `onSubmit` instead of `onChange` prop.

```tsx
import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {MultiSelect} from '@inkjs/ui';

function Example() {
	const [value, setValue] = useState<string[]>([]);

	return (
		<Box flexDirection="column" gap={1}>
			<MultiSelect
				options={[
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
				]}
				onSubmit={setValue}
			/>

			<Text>Selected values: {value.join(', ')}</Text>
		</Box>
	);
}

render(<Example />);
```

<img src="../media/multi-select-submit.gif" width="400">

### Disabled

When there are two or more selects, only one should be receiving user input at a time, while others should be disabled via `isDisabled` prop.

```tsx
import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {MultiSelect} from '@inkjs/ui';

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

function Example() {
	const [activeInput, setActiveInput] = useState('primary');
	const [primaryColors, setPrimaryColors] = useState<string[]>([]);
	const [secondaryColors, setSecondaryColors] = useState<string[]>([]);

	return (
		<Box>
			<Box flexDirection="column" gap={1} width={34}>
				<MultiSelect
					isDisabled={activeInput !== 'primary'}
					options={options}
					onChange={setPrimaryColors}
					onSubmit={() => {
						setActiveInput('secondary');
					}}
				/>

				<Text>Primary colors: {primaryColors.join(', ')}</Text>
			</Box>

			<Box flexDirection="column" gap={1} width={34}>
				<MultiSelect
					isDisabled={activeInput !== 'secondary'}
					options={options}
					onChange={setSecondaryColors}
					onSubmit={() => {
						setActiveInput('none');
					}}
				/>

				<Text>Secondary colors: {secondaryColors.join(', ')}</Text>
			</Box>
		</Box>
	);
}

render(<Example />);
```

<img src="../media/multi-select-disabled.gif" width="400">

## Props

### isDisabled

Type: `boolean`\
Default: `false`

When disabled, user input is ignored.

### visibleOptionCount

Type: `number`\
Default: `5`

Number of visible options.

### highlightText

Type: `string`

Highlight text in option labels.

### options

Type: `Array<{ label: string; value: string; }>`

Options.

### defaultValue

Type: `string[]`

Default value.

### onChange(value)

Type: `Function`

Callback when selected options change.

#### value

Type: `string[]`

Values of selected options.

### onSubmit(value)

Type: `Function`

Callback when user presses enter.

#### value

Type: `string[]`

Value of selected options.
