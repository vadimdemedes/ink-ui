import {useReducer, useCallback, useEffect, type Reducer, useMemo} from 'react';

type State = {
	previousValue: string;
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
				previousValue: state.value,
				value:
					state.value.slice(0, state.cursorOffset) +
					action.text +
					state.value.slice(state.cursorOffset),
				cursorOffset: state.cursorOffset + action.text.length,
			};
		}

		case 'delete': {
			const newCursorOffset = Math.max(0, state.cursorOffset - 1);

			return {
				...state,
				previousValue: state.value,
				value:
					state.value.slice(0, newCursorOffset) +
					state.value.slice(newCursorOffset + 1),
				cursorOffset: newCursorOffset,
			};
		}

		default: {
			return state;
		}
	}
};

export type UseTextInputStateProps = {
	/**
	 * Default input value.
	 */
	defaultValue?: string;

	/**
	 * Suggestions to autocomplete the input value.
	 */
	suggestions?: string[];

	/**
	 * Callback when input value changes.
	 */
	onChange?: (value: string) => void;

	/**
	 * Callback when enter is pressed. First argument is input value.
	 */
	onSubmit?: (value: string) => void;
};

export type TextInputState = State & {
	/**
	 * Suggested auto completion.
	 */
	suggestion: string | undefined;

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

export const useTextInputState = ({
	defaultValue = '',
	suggestions,
	onChange,
	onSubmit,
}: UseTextInputStateProps) => {
	const [state, dispatch] = useReducer(reducer, {
		previousValue: defaultValue,
		value: defaultValue,
		cursorOffset: defaultValue.length,
	});

	const suggestion = useMemo(() => {
		if (state.value.length === 0) {
			return;
		}

		return suggestions
			?.find(suggestion => suggestion.startsWith(state.value))
			?.replace(state.value, '');
	}, [state.value, suggestions]);

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
		if (suggestion) {
			insert(suggestion);
			onSubmit?.(state.value + suggestion);
			return;
		}

		onSubmit?.(state.value);
	}, [state.value, suggestion, insert, onSubmit]);

	useEffect(() => {
		if (state.value !== state.previousValue) {
			onChange?.(state.value);
		}
	}, [state.previousValue, state.value, onChange]);

	return {
		...state,
		suggestion,
		moveCursorLeft,
		moveCursorRight,
		insert,
		delete: deleteCharacter,
		submit,
	};
};
