import React from 'react';
import {Text} from 'ink';
import {useTextInputState} from './use-text-input-state.js';
import {useTextInput} from './use-text-input.js';

export type TextInputProps = {
	/**
	 * Listen to user's input. Useful in case there are multiple input components
	 * at the same time and input must be "routed" to a specific component.
	 *
	 * @default true
	 */
	isFocused?: boolean;

	/**
	 * Text to display when `value` is empty.
	 */
	placeholder?: string;

	/**
	 * Replace all chars and mask the value. Useful for password inputs.
	 */
	mask?: string;

	/**
	 * Initial value to display in a text input.
	 */
	defaultValue?: string;

	/**
	 * Callback when value updates.
	 */
	onChange?: (value: string) => void;

	/**
	 * Callback when `Enter` is pressed. First argument is a value of the input.
	 */
	onSubmit?: (value: string) => void;
};

export function TextInput({
	isFocused = true,
	defaultValue,
	placeholder = '',
	mask,
	onChange,
	onSubmit,
}: TextInputProps) {
	const state = useTextInputState({
		defaultValue,
		onChange,
	});

	const {inputValue} = useTextInput({
		isFocused,
		placeholder,
		mask,
		state,
		onSubmit,
	});

	return <Text>{inputValue}</Text>;
}
