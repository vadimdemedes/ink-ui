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
	 * Index of the previously selected option.
	 */
	previousSelectedIndex: number | undefined;

	/**
	 * Index of the selected option.
	 */
	selectedIndex: number | undefined;
};

type Action =
	| FocusNextOptionAction
	| FocusPreviousOptionAction
	| SelectFocusedOptionAction
	| ResetAction;

type FocusNextOptionAction = {
	type: 'focus-next-option';
};

type FocusPreviousOptionAction = {
	type: 'focus-previous-option';
};

type SelectFocusedOptionAction = {
	type: 'select-focused-option';
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

		case 'select-focused-option': {
			return {
				...state,
				previousSelectedIndex: state.selectedIndex,
				selectedIndex: state.focusedIndex,
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

export type UseSelectStateProps = {
	/**
	 * Number of items to display.
	 */
	defaultLimit?: number;

	/**
	 * Options.
	 */
	options: Option[];

	/**
	 * Initially selected option's value.
	 */
	defaultValue?: string;

	/**
	 * Callback for selecting an option.
	 */
	onChange?: (value: string) => void;
};

export type SelectState = Pick<
	State,
	'focusedIndex' | 'visibleFromIndex' | 'visibleToIndex' | 'selectedIndex'
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
	selectFocusedOption: () => void;
};

const createDefaultState = ({
	defaultLimit,
	defaultValue,
	options,
}: Pick<UseSelectStateProps, 'defaultLimit' | 'defaultValue' | 'options'>) => {
	const limit =
		typeof defaultLimit === 'number'
			? Math.min(defaultLimit, options.length)
			: options.length;

	let selectedIndex: number | undefined;

	if (defaultValue) {
		selectedIndex = options.findIndex(option => {
			return option.value === defaultValue;
		});
	}

	return {
		limit,
		size: options.length,
		focusedIndex: 0,
		visibleFromIndex: 0,
		visibleToIndex: limit,
		previousSelectedIndex: selectedIndex,
		selectedIndex,
	};
};

export const useSelectState = ({
	defaultLimit,
	options,
	defaultValue,
	onChange,
}: UseSelectStateProps) => {
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

	const selectFocusedOption = useCallback(() => {
		dispatch({
			type: 'select-focused-option',
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
		if (state.previousSelectedIndex !== state.selectedIndex) {
			const option = options[state.focusedIndex];

			if (option) {
				onChange?.(option.value);
			}
		}
	}, [state.previousSelectedIndex, state.selectedIndex, options, onChange]);

	return {
		focusedIndex: state.focusedIndex,
		visibleFromIndex: state.visibleFromIndex,
		visibleToIndex: state.visibleToIndex,
		selectedIndex: state.selectedIndex,
		visibleOptions,
		focusNextOption,
		focusPreviousOption,
		selectFocusedOption,
	};
};
