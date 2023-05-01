import {useMemo} from 'react';
import {useInput} from 'ink';
import chalk from 'chalk';
import {type MaskInputState} from './use-mask-input-state.js';

export type UseMaskInputProps = {
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
	state: MaskInputState;

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

export const useMaskInput = ({
	isFocused = true,
	state,
}: UseMaskInputProps): UseTextInputResult => {
	const renderedValue = useMemo(() => {
		let index = 0;
		let result = '';

		for (const node of state.value) {
			if (index === state.cursorOffset) {
				const character =
					node.type === 'character'
						? node.value ?? node.placeholder
						: node.value;

				result += isFocused ? chalk.inverse(character) : character;
				index++;
				continue;
			}

			if (node.type === 'separator') {
				result += chalk.dim(node.value);
				index++;
				continue;
			}

			if (!node.value) {
				result += chalk.dim(node.placeholder);
				index++;
				continue;
			}

			result += node.value;
			index++;
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
		inputValue: renderedValue,
	};
};
