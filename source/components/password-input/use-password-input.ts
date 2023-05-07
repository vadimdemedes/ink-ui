import {useMemo} from 'react';
import {useInput} from 'ink';
import chalk from 'chalk';
import {type PasswordInputState} from './use-password-input-state.js';

export type UsePasswordInputProps = {
	/**
	 * When disabled, user input is ignored.
	 *
	 * @default false
	 */
	isDisabled?: boolean;

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
	isDisabled = false,
	state,
	placeholder = '',
}: UsePasswordInputProps): UsePasswordInputResult => {
	const renderedPlaceholder = useMemo(() => {
		if (isDisabled) {
			return placeholder ? chalk.dim(placeholder) : '';
		}

		return placeholder && placeholder.length > 0
			? chalk.inverse(placeholder[0]) + chalk.dim(placeholder.slice(1))
			: cursor;
	}, [isDisabled, placeholder]);

	const renderedValue = useMemo(() => {
		const value = '*'.repeat(state.value.length);

		if (isDisabled) {
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
	}, [isDisabled, state.value, state.cursorOffset]);

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
		{isActive: !isDisabled},
	);

	return {
		inputValue: state.value.length > 0 ? renderedValue : renderedPlaceholder,
	};
};
