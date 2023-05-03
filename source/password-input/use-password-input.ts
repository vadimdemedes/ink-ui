import {useMemo} from 'react';
import {useInput} from 'ink';
import chalk from 'chalk';
import {type PasswordInputState} from './use-password-input-state.js';

export type UsePasswordInputProps = {
	/**
	 * Listen to user's input. Useful in case there are multiple input components
	 * at the same time and input must be "routed" to a specific component.
	 *
	 * @default true
	 */
	isFocused?: boolean;

	/**
	 * Password input state.
	 */
	state: PasswordInputState;

	/**
	 * Text to display when `value` is empty.
	 *
	 * @default ""
	 */
	placeholder?: string;
};

export type UsePasswordInputResult = {
	/**
	 * Value to render inside the input.
	 */
	inputValue: string;
};

const cursor = chalk.inverse(' ');

export const usePasswordInput = ({
	isFocused = true,
	state,
	placeholder = '',
}: UsePasswordInputProps): UsePasswordInputResult => {
	const renderedPlaceholder = useMemo(() => {
		if (!isFocused) {
			return placeholder ? chalk.dim(placeholder) : '';
		}

		return placeholder && placeholder.length > 0
			? chalk.inverse(placeholder[0]) + chalk.dim(placeholder.slice(1))
			: cursor;
	}, [isFocused, placeholder]);

	const renderedValue = useMemo(() => {
		const value = '*'.repeat(state.value.length);

		if (!isFocused) {
			return value;
		}

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
	}, [isFocused, state.value, state.cursorOffset]);

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
				state.submit();
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
