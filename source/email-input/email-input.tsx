import React from 'react';
import {Text} from 'ink';
import {useEmailInputState} from './use-email-input-state.js';
import {useEmailInput} from './use-email-input.js';

export type EmailInputProps = {
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
	 * Initial value to display in a text input.
	 */
	defaultValue?: string;

	/**
	 * Domains of email providers to auto complete.
	 *
	 * @default ["aol.com", "gmail.com", "yahoo.com", "hotmail.com", "live.com", "outlook.com", "icloud.com", "hey.com"]
	 */
	domains?: string[];

	/**
	 * Callback when value updates.
	 */
	onChange?: (value: string) => void;

	/**
	 * Callback when `Enter` is pressed. First argument is a value of the input.
	 */
	onSubmit?: (value: string) => void;
};

export function EmailInput({
	isFocused = true,
	defaultValue,
	placeholder = '',
	domains,
	onChange,
	onSubmit,
}: EmailInputProps) {
	const state = useEmailInputState({
		defaultValue,
		domains,
		onChange,
		onSubmit,
	});

	const {inputValue} = useEmailInput({
		isFocused,
		placeholder,
		state,
	});

	return <Text>{inputValue}</Text>;
}
