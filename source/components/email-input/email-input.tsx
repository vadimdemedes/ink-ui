import React from 'react';
import {Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {useEmailInputState} from './use-email-input-state.js';
import {useEmailInput} from './use-email-input.js';
import {type Theme} from './theme.js';

export type EmailInputProps = {
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
	 * Domains of email providers to autocomplete.
	 *
	 * @default ["aol.com", "gmail.com", "yahoo.com", "hotmail.com", "live.com", "outlook.com", "icloud.com", "hey.com"]
	 */
	readonly domains?: string[];

	/**
	 * Callback when input value changes.
	 */
	readonly onChange?: (value: string) => void;

	/**
	 * Callback when enter is pressed. First argument is input value.
	 */
	readonly onSubmit?: (value: string) => void;
};

export function EmailInput({
	isDisabled = false,
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
		isDisabled,
		placeholder,
		state,
	});

	const {styles} = useComponentTheme<Theme>('EmailInput');

	return <Text {...styles.value()}>{inputValue}</Text>;
}
