import React from 'react';
import {Text} from 'ink';
import {usePasswordInputState} from './use-password-input-state.js';
import {usePasswordInput} from './use-password-input.js';

export type PasswordInputProps = {
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
	 * Callback when value updates.
	 */
	onChange?: (value: string) => void;

	/**
	 * Callback when `Enter` is pressed. First argument is a value of the input.
	 */
	onSubmit?: (value: string) => void;
};

export function PasswordInput({
	isFocused = true,
	placeholder = '',
	onChange,
	onSubmit,
}: PasswordInputProps) {
	const state = usePasswordInputState({
		onChange,
		onSubmit,
	});

	const {inputValue} = usePasswordInput({
		isFocused,
		placeholder,
		state,
	});

	return <Text>{inputValue}</Text>;
}