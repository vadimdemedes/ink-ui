import {useReducer, useCallback, type Reducer} from 'react';

type State = {
	value: string;
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

const insertText = (source: string, text: string, at: number) => {
	return source.slice(0, at) + text + source.slice(at);
};

const deleteText = (source: string, at: number) => {
	return source.slice(0, Math.max(0, at - 1)) + source.slice(at);
};

const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'move-cursor-left': {
			return {
				...state,
				cursorOffset: Math.max(0, state.cursorOffset - 1),
			};
		}

		case 'move-cursor-right': {
			return {
				...state,
				cursorOffset: Math.min(state.value.length, state.cursorOffset + 1),
			};
		}

		case 'insert': {
			return {
				...state,
				value: insertText(state.value, action.text, state.cursorOffset),
				cursorOffset: state.cursorOffset + action.text.length,
			};
		}

		case 'delete': {
			return {
				...state,
				value: deleteText(state.value, state.cursorOffset),
				cursorOffset: Math.max(0, state.cursorOffset - 1),
			};
		}

		default: {
			return state;
		}
	}
};

export type UseTextInputStateProps = {
	/**
	 * Initial value to display in a text input.
	 */
	defaultValue?: string;

	/**
	 * Callback when value updates.
	 */
	onChange?: (value: string) => void;
};

export type TextInputState = State & {
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
};

export const useTextInputState = ({
	defaultValue,
	onChange,
}: UseTextInputStateProps) => {
	const [state, dispatch] = useReducer(reducer, {
		value: defaultValue ?? '',
		cursorOffset: defaultValue?.length ?? 0,
	});

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

	const insert = useCallback(
		(text: string) => {
			dispatch({
				type: 'insert',
				text,
			});

			if (typeof onChange === 'function') {
				const updatedText = insertText(state.value, text, state.cursorOffset);
				onChange(updatedText);
			}
		},
		[state.value, state.cursorOffset, onChange],
	);

	const deleteCharacter = useCallback(() => {
		dispatch({
			type: 'delete',
		});

		if (typeof onChange === 'function') {
			const updatedText = deleteText(state.value, state.cursorOffset);
			onChange(updatedText);
		}
	}, [state.value, state.cursorOffset, onChange]);

	return {
		...state,
		moveCursorLeft,
		moveCursorRight,
		insert,
		delete: deleteCharacter,
	};
};
