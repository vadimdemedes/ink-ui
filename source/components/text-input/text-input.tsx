import React from 'react';
import {Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {useTextInputState} from './use-text-input-state.js';
import {useTextInput} from './use-text-input.js';
import {type Theme} from './theme.js';

export type TextInputProps = {
	/**
	 * When disabled, user input is ignored.
	 *
	 * @default false
	 */
	readonly isDisabled?: boolean;

	/**
	 * Text to display when input is empty.
	 */
	readonly placeholder?: string;

	/**
	 * Default input value.
	 */
	readonly defaultValue?: string;

	/**
	 * Suggestions to autocomplete the input value.
	 */
	readonly suggestions?: string[];

	/**
	 * Callback when input value changes.
	 */
	readonly onChange?: (value: string) => void;

	/**
	 * Callback when enter is pressed. First argument is input value.
	 */
	readonly onSubmit?: (value: string) => void;
};

export function TextInput({
	isDisabled = false,
	defaultValue,
	placeholder = '',
	suggestions,
	onChange,
	onSubmit,
}: TextInputProps) {
	const state = useTextInputState({
		defaultValue,
		suggestions,
		onChange,
		onSubmit,
	});

	const {inputValue} = useTextInput({
		isDisabled,
		placeholder,
		state,
	});

	const {styles} = useComponentTheme<Theme>('TextInput');

	return <Text {...styles.value()}>{inputValue}</Text>;
}
