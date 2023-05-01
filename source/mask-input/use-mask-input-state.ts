import {useReducer, useCallback, type Reducer, useEffect} from 'react';

type MaskNode = CharacterMaskNode | SeparatorMaskNode;

type CharacterMaskNode = {
	type: 'character';
	pattern: RegExp;
	value: string | undefined;
	placeholder: string;
};

type SeparatorMaskNode = {
	type: 'separator';
	value: string;
};

const anyMask = /[a-z\d*]/i;
const numberMask = /\d/;
const lowerCaseLetterMask = /[a-z]/;
const upperCaseLetterMask = /[A-Z]/;
const alphanumericMask = /[a-z\d]/i;

const parseMask = (
	mask: string,
	defaultValue: string | undefined,
	placeholder: string | undefined,
): MaskNode[] => {
	return [...mask].map((item, index) => {
		let pattern = alphanumericMask;

		if (numberMask.test(item)) {
			pattern = numberMask;
		} else if (lowerCaseLetterMask.test(item)) {
			pattern = lowerCaseLetterMask;
		} else if (upperCaseLetterMask.test(item)) {
			pattern = upperCaseLetterMask;
		}

		if (anyMask.test(item)) {
			return {
				type: 'character',
				pattern,
				value: defaultValue?.[index],
				placeholder: placeholder?.[index] ?? item,
			};
		}

		return {
			type: 'separator',
			value: item,
		};
	});
};

const stringifyValue = (value: MaskNode[]): string | undefined => {
	let result = '';

	for (const node of value) {
		if (node.type === 'separator') {
			result += node.value;
			continue;
		}

		if (!node.value) {
			return;
		}

		result += node.value;
	}

	return result;
};

type State = {
	value: MaskNode[];
	cursorOffset: number;
};

type Action =
	| MoveCursorLeftAction
	| MoveCursorRightAction
	| InsertAction
	| DeleteAction;

type MoveCursorLeftAction = {
	type: 'move-cursor-left';
};

type MoveCursorRightAction = {
	type: 'move-cursor-right';
};

type InsertAction = {
	type: 'insert';
	text: string;
};

type DeleteAction = {
	type: 'delete';
};

const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'move-cursor-left': {
			if (state.cursorOffset === 0) {
				return state;
			}

			for (let index = state.cursorOffset - 1; index >= 0; index--) {
				const node = state.value[index];

				if (!node || node.type === 'separator') {
					continue;
				}

				return {
					...state,
					cursorOffset: index,
				};
			}

			return state;
		}

		case 'move-cursor-right': {
			if (state.cursorOffset === state.value.length - 1) {
				return state;
			}

			for (
				let index = state.cursorOffset + 1;
				index < state.value.length;
				index++
			) {
				const node = state.value[index];

				if (!node || node.type === 'separator') {
					continue;
				}

				return {
					...state,
					cursorOffset: index,
				};
			}

			return state;
		}

		case 'insert': {
			const nextValue = [...state.value];

			if (action.text.length === 1) {
				const node = nextValue[state.cursorOffset];

				if (
					!node ||
					node.type === 'separator' ||
					!node.pattern.test(action.text)
				) {
					return state;
				}

				nextValue[state.cursorOffset]!.value = action.text;

				for (
					let nextCursorOffset = state.cursorOffset + 1;
					nextCursorOffset < state.value.length;
					nextCursorOffset++
				) {
					const node = nextValue[nextCursorOffset];

					if (!node || node.type === 'separator') {
						continue;
					}

					return {
						...state,
						value: nextValue,
						cursorOffset: nextCursorOffset,
					};
				}

				return {
					...state,
					value: nextValue,
				};
			}

			let index = state.cursorOffset;
			let textIndex = 0;

			for (index = state.cursorOffset; index < state.value.length; index++) {
				const node = nextValue[index];

				if (!node) {
					continue;
				}

				const character = action.text[textIndex];

				if (!character) {
					break;
				}

				if (node.type === 'separator') {
					if (node.value === character) {
						textIndex++;
					}

					continue;
				}

				if (!node.pattern.test(character)) {
					return state;
				}

				node.value = character;
				textIndex++;
			}

			return {
				...state,
				value: nextValue,
				cursorOffset: Math.min(state.value.length - 1, index),
			};
		}

		case 'delete': {
			const nextValue = [...state.value];
			nextValue[state.cursorOffset]!.value = undefined;

			for (
				let nextCursorOffset = state.cursorOffset - 1;
				nextCursorOffset >= 0;
				nextCursorOffset--
			) {
				const node = nextValue[nextCursorOffset];

				if (!node || node.type === 'separator') {
					continue;
				}

				return {
					...state,
					value: nextValue,
					cursorOffset: nextCursorOffset,
				};
			}

			return {
				...state,
				value: nextValue,
			};
		}

		default: {
			return state;
		}
	}
};

export type UseMaskInputStateProps = {
	/**
	 * Initial value to display in a text input.
	 */
	defaultValue?: string;

	/**
	 * Mask that input must conform to.
	 */
	mask: string;

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

export type MaskInputState = State & {
	/**
	 * Move cursor to the left.
	 */
	moveCursorLeft: () => void;

	/**
	 * Move cursor to the right.
	 */
	moveCursorRight: () => void;

	/**
	 * Insert text.
	 */
	insert: (text: string) => void;

	/**
	 * Delete character.
	 */
	delete: () => void;

	/**
	 * Submit input value.
	 */
	submit: () => void;
};

export const useMaskInputState = ({
	defaultValue,
	mask,
	placeholder,
	onChange,
	onSubmit,
}: UseMaskInputStateProps): MaskInputState => {
	const [state, dispatch] = useReducer(
		reducer,
		{defaultValue, mask, placeholder},
		({defaultValue, mask, placeholder}) => ({
			value: parseMask(mask, defaultValue, placeholder),
			cursorOffset: defaultValue?.length ?? 0,
		}),
	);

	const moveCursorLeft = useCallback(() => {
		dispatch({
			type: 'move-cursor-left',
		});
	}, []);

	const moveCursorRight = useCallback(() => {
		dispatch({
			type: 'move-cursor-right',
		});
	}, []);

	const insert = useCallback((text: string) => {
		dispatch({
			type: 'insert',
			text,
		});
	}, []);

	const deleteCharacter = useCallback(() => {
		dispatch({
			type: 'delete',
		});
	}, []);

	const submit = useCallback(() => {
		const value = stringifyValue(state.value);

		if (typeof value === 'string') {
			onSubmit?.(value);
		}
	}, [state.value, onSubmit]);

	useEffect(() => {
		const value = stringifyValue(state.value);

		if (typeof value === 'string') {
			onChange?.(value);
		}
	}, [state.value, onChange]);

	return {
		...state,
		moveCursorLeft,
		moveCursorRight,
		insert,
		delete: deleteCharacter,
		submit,
	};
};
