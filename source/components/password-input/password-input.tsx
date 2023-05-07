import React from 'react';
import {Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {usePasswordInputState} from './use-password-input-state.js';
import {usePasswordInput} from './use-password-input.js';
import {type Theme} from './theme.js';

export type PasswordInputProps = {
	/**
	 * When disabled, user input is ignored.
	 *
	 * @default false
	 */
	isDisabled?: boolean;

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
	isDisabled = false,
	placeholder = '',
	onChange,
	onSubmit,
}: PasswordInputProps) {
	const state = usePasswordInputState({
		onChange,
		onSubmit,
	});

	const {inputValue} = usePasswordInput({
		isDisabled,
		placeholder,
		state,
	});

	const {styles} = useComponentTheme<Theme>('PasswordInput');

	return <Text {...styles.value()}>{inputValue}</Text>;
}
