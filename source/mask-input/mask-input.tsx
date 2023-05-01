import React from 'react';
import {Text} from 'ink';
import {useMaskInputState} from './use-mask-input-state.js';
import {useMaskInput} from './use-mask-input.js';

export type MaskInputProps = {
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
	 * Mask that input must conform to.
	 */
	mask: string;

	/**
	 * Initial value to display in a text input.
	 * Must conform to `mask`.
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

export function MaskInput({
	isFocused = true,
	defaultValue,
	placeholder = '',
	mask,
	onChange,
	onSubmit,
}: MaskInputProps) {
	const state = useMaskInputState({
		defaultValue,
		mask,
		onChange,
		onSubmit,
	});

	const {inputValue} = useMaskInput({
		isFocused,
		placeholder,
		state,
	});

	return <Text>{inputValue}</Text>;
}
