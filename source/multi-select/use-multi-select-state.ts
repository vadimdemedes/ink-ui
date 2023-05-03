import {isDeepStrictEqual} from 'node:util';
import {
	useReducer,
	type Reducer,
	useCallback,
	useMemo,
	useState,
	useEffect,
} from 'react';
import {type Option} from './types.js';

type State = {
	/**
	 * Limit how many options can be visible at a time.
	 */
	limit: number;

	/**
	 * Total number of options.
	 */
	size: number;

	/**
	 * Index of the currently focused option.
	 */
	focusedIndex: number;

	/**
	 * Index of the first visible option.
	 */
	visibleFromIndex: number;

	/**
	 * Index of the last visible option.
	 */
	visibleToIndex: number;

	/**
	 * Indexes of previously selected options.
	 */
	previousSelectedIndexes: number[];

	/**
	 * Indexes of selected options.
	 */
	selectedIndexes: number[];
};

type Action =
	| FocusNextOptionAction
	| FocusPreviousOptionAction
	| ToggleFocusedOptionAction
	| ResetAction;

type FocusNextOptionAction = {
	type: 'focus-next-option';
};

type FocusPreviousOptionAction = {
	type: 'focus-previous-option';
};

type ToggleFocusedOptionAction = {
	type: 'toggle-focused-option';
};

type ResetAction = {
	type: 'reset';
	state: State;
};

const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'focus-next-option': {
			const nextFocusedIndex = Math.min(state.size - 1, state.focusedIndex + 1);

			if (nextFocusedIndex === state.focusedIndex) {
				return state;
			}

			const needsToScroll = nextFocusedIndex >= state.visibleToIndex;

			if (!needsToScroll) {
				return {
					...state,
					focusedIndex: nextFocusedIndex,
				};
			}

			const nextVisibleToIndex = Math.min(state.size, state.visibleToIndex + 1);
			const nextVisibleFromIndex = nextVisibleToIndex - state.limit;

			return {
				...state,
				focusedIndex: nextFocusedIndex,
				visibleFromIndex: nextVisibleFromIndex,
				visibleToIndex: nextVisibleToIndex,
			};
		}

		case 'focus-previous-option': {
			const nextFocusedIndex = Math.max(0, state.focusedIndex - 1);

			if (nextFocusedIndex === state.focusedIndex) {
				return state;
			}

			const needsToScroll = nextFocusedIndex <= state.visibleFromIndex;

			if (!needsToScroll) {
				return {
					...state,
					focusedIndex: nextFocusedIndex,
				};
			}

			const nextVisibleFromIndex = Math.max(0, state.visibleFromIndex - 1);
			const nextVisibleToIndex = nextVisibleFromIndex + state.limit;

			return {
				...state,
				focusedIndex: nextFocusedIndex,
				visibleFromIndex: nextVisibleFromIndex,
				visibleToIndex: nextVisibleToIndex,
			};
		}

		case 'toggle-focused-option': {
			if (state.selectedIndexes.includes(state.focusedIndex)) {
				const newSelectedIndexes = new Set(state.selectedIndexes);
				newSelectedIndexes.delete(state.focusedIndex);

				return {
					...state,
					previousSelectedIndexes: state.selectedIndexes,
					selectedIndexes: [...newSelectedIndexes],
				};
			}

			return {
				...state,
				previousSelectedIndexes: state.selectedIndexes,
				selectedIndexes: [...state.selectedIndexes, state.focusedIndex],
			};
		}

		case 'reset': {
			return action.state;
		}

		default: {
			return state;
		}
	}
};

export type UseMultiSelectStateProps = {
	/**
	 * Number of items to display.
	 */
	defaultLimit?: number;

	/**
	 * Options.
	 */
	options: Option[];

	/**
	 * Initially selected option values.
	 */
	defaultValue?: string[];

	/**
	 * Callback for selecting options.
	 */
	onChange?: (value: string[]) => void;
};

export type MultiSelectState = Pick<
	State,
	'focusedIndex' | 'visibleFromIndex' | 'visibleToIndex' | 'selectedIndexes'
> & {
	/**
	 * Visible options.
	 */
	visibleOptions: Array<Option & {index: number}>;

	/**
	 * Focus next option and scroll the list down, if needed.
	 */
	focusNextOption: () => void;

	/**
	 * Focus previous option and scroll the list up, if needed.
	 */
	focusPreviousOption: () => void;

	/**
	 * Select currently focused option.
	 */
	toggleFocusedOption: () => void;
};

const createDefaultState = ({
	defaultLimit,
	defaultValue,
	options,
}: Pick<
	UseMultiSelectStateProps,
	'defaultLimit' | 'defaultValue' | 'options'
>) => {
	const limit =
		typeof defaultLimit === 'number'
			? Math.min(defaultLimit, options.length)
			: options.length;

	const selectedIndexes: number[] = [];

	if (defaultValue) {
		let index = 0;

		for (const option of options) {
			if (defaultValue.includes(option.value)) {
				selectedIndexes.push(index);
			}

			index++;
		}
	}

	return {
		limit,
		size: options.length,
		focusedIndex: 0,
		visibleFromIndex: 0,
		visibleToIndex: limit,
		previousSelectedIndexes: selectedIndexes,
		selectedIndexes,
	};
};

export const useMultiSelectState = ({
	defaultLimit,
	options,
	defaultValue,
	onChange,
}: UseMultiSelectStateProps) => {
	const [state, dispatch] = useReducer(
		reducer,
		{defaultLimit, defaultValue, options},
		createDefaultState,
	);

	const [lastOptions, setLastOptions] = useState(options);

	if (options !== lastOptions && !isDeepStrictEqual(options, lastOptions)) {
		dispatch({
			type: 'reset',
			state: createDefaultState({defaultLimit, defaultValue, options}),
		});

		setLastOptions(options);
	}

	const focusNextOption = useCallback(() => {
		dispatch({
			type: 'focus-next-option',
		});
	}, []);

	const focusPreviousOption = useCallback(() => {
		dispatch({
			type: 'focus-previous-option',
		});
	}, []);

	const toggleFocusedOption = useCallback(() => {
		dispatch({
			type: 'toggle-focused-option',
		});
	}, []);

	const visibleOptions = useMemo(() => {
		return options
			.map((option, index) => ({
				...option,
				index,
			}))
			.slice(state.visibleFromIndex, state.visibleToIndex);
	}, [options, state.visibleFromIndex, state.visibleToIndex]);

	useEffect(() => {
		if (
			!isDeepStrictEqual(state.previousSelectedIndexes, state.selectedIndexes)
		) {
			const values = options
				.filter((_option, index) => {
					return state.selectedIndexes.includes(index);
				})
				.map(option => option.value);

			onChange?.(values);
		}
	}, [state.previousSelectedIndexes, state.selectedIndexes, options, onChange]);

	return {
		focusedIndex: state.focusedIndex,
		visibleFromIndex: state.visibleFromIndex,
		visibleToIndex: state.visibleToIndex,
		selectedIndexes: state.selectedIndexes,
		visibleOptions,
		focusNextOption,
		focusPreviousOption,
		toggleFocusedOption,
	};
};
