import {useMemo} from 'react';
import {useInput} from 'ink';
import chalk from 'chalk';
import {type EmailInputState} from './use-email-input-state.js';

export type UseEmailInputProps = {
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
	state: EmailInputState;

	/**
	 * Text to display when `value` is empty.
	 *
	 * @default ""
	 */
	placeholder?: string;
};

export type UseTextInputResult = {
	/**
	 * Value to render inside the input.
	 */
	inputValue: string;
};

const cursor = chalk.inverse(' ');

export const useEmailInput = ({
	isFocused = true,
	state,
	placeholder = '',
}: UseEmailInputProps): UseTextInputResult => {
	const renderedPlaceholder = useMemo(() => {
		if (!isFocused) {
			return placeholder ? chalk.grey(placeholder) : '';
		}

		return placeholder && placeholder.length > 0
			? chalk.inverse(placeholder[0]) + chalk.grey(placeholder.slice(1))
			: cursor;
	}, [isFocused, placeholder]);

	const renderedValue = useMemo(() => {
		if (!isFocused) {
			return state.value;
		}

		let index = 0;
		let result = state.value.length > 0 ? '' : cursor;

		for (const char of state.value) {
			result += index === state.cursorOffset ? chalk.inverse(char) : char;

			index++;
		}

		if (state.suggestion) {
			if (state.cursorOffset === state.value.length) {
				result +=
					chalk.inverse(state.suggestion[0]) +
					chalk.dim(state.suggestion.slice(1));
			} else {
				result += chalk.dim(state.suggestion);
			}

			return result;
		}

		if (state.value.length > 0 && state.cursorOffset === state.value.length) {
			result += cursor;
		}

		return result;
	}, [isFocused, state.value, state.cursorOffset, state.suggestion]);

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
