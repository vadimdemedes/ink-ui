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
			if (state.value.includes('@') && action.text.includes('@')) {
				return state;
			}

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

export type UseEmailInputStateProps = {
	/**
	 * Initial value to display in a text input.
	 */
	defaultValue?: string;

	/**
	 * Domains of email providers to auto complete.
	 *
	 * @default ["aol.com", "gmail.com", "yahoo.com", "hotmail.com", "live.com", "outlook.com", "icloud.com", "hey.com"]
	 */
	domains?: string[];

	/**
	 * Callback when value updates.
	 */
	onChange?: (value: string) => void;

	/**
	 * Callback when `Enter` is pressed. First argument is a value of the input.
	 */
	onSubmit?: (value: string) => void;
};

export type EmailInputState = State & {
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

export const useEmailInputState = ({
	defaultValue = '',
	domains = [
		'aol.com',
		'gmail.com',
		'yahoo.com',
		'hotmail.com',
		'live.com',
		'outlook.com',
		'icloud.com',
		'hey.com',
	],
	onChange,
	onSubmit,
}: UseEmailInputStateProps) => {
	const [state, dispatch] = useReducer(reducer, {
		previousValue: defaultValue,
		value: defaultValue,
		cursorOffset: defaultValue.length,
	});

	const suggestion = useMemo(() => {
		if (state.value.length === 0 || !state.value.includes('@')) {
			return;
		}

		const atIndex = state.value.indexOf('@');
		const enteredDomain = state.value.slice(atIndex + 1);

		return domains
			?.find(domain => domain.startsWith(enteredDomain))
			?.replace(enteredDomain, '');
	}, [state.value, domains]);

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
		if (state.previousValue !== state.value) {
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
