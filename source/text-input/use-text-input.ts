import {useMemo} from 'react';
import {useInput} from 'ink';
import chalk from 'chalk';
import {type TextInputState} from './use-text-input-state.js';

export type UseTextInputProps = {
	/**
	 * Listen to user's input. Useful in case there are multiple input components
	 * at the same time and input must be "routed" to a specific component.
	 *
	 * @default true
	 */
	isFocused?: boolean;

	/**
	 * Text input state.
	 */
	state: TextInputState;

	/**
	 * Text to display when `value` is empty.
	 *
	 * @default ""
	 */
	placeholder?: string;

	/**
	 * Replace all chars and mask the value. Useful for password inputs.
	 */
	mask?: string;

	/**
	 * Callback when `Enter` is pressed. First argument is a value of the input.
	 */
	onSubmit?: (value: string) => void;
};

export type UseTextInputResult = {
	/**
	 * Value to render inside the input.
	 */
	inputValue: string;
};

const cursor = chalk.inverse(' ');

export const useTextInput = ({
	isFocused = true,
	state,
	mask,
	placeholder = '',
	onSubmit,
}: UseTextInputProps): UseTextInputResult => {
	const renderedPlaceholder = useMemo(() => {
		if (!isFocused) {
			return placeholder ? chalk.grey(placeholder) : '';
		}

		return placeholder && placeholder.length > 0
			? chalk.inverse(placeholder[0]) + chalk.grey(placeholder.slice(1))
			: cursor;
	}, [isFocused, placeholder]);

	const renderedValue = useMemo(() => {
		const value = mask ? mask.repeat(state.value.length) : state.value;

		let index = 0;
		let result = value.length > 0 ? '' : cursor;

		for (const char of value) {
			result += index === state.cursorOffset ? chalk.inverse(char) : char;

			index++;
		}

		if (value.length > 0 && state.cursorOffset === value.length) {
			result += cursor;
		}

		return result;
	}, [isFocused, mask, state.value, state.cursorOffset]);

	useInput(
		(input, key) => {
			if (
				key.upArrow ||
				key.downArrow ||
				(key.ctrl && input === 'c') ||
				key.tab ||
				(key.shift && key.tab)
			) {
				return;
			}

			if (key.return) {
				onSubmit?.(state.value);
				return;
			}

			if (key.leftArrow) {
				state.moveCursorLeft();
			} else if (key.rightArrow) {
				state.moveCursorRight();
			} else if (key.backspace || key.delete) {
				state.delete();
			} else {
				state.insert(input);
			}
		},
		{isActive: isFocused},
	);

	return {
		inputValue: state.value.length > 0 ? renderedValue : renderedPlaceholder,
	};
};
