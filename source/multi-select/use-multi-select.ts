import {useInput} from 'ink';
import {type MultiSelectState} from './use-multi-select-state.js';
import {type Option} from './types.js';

export type UseMultiSelectProps = {
	/**
	 * Listen to user's input. Useful in case there are multiple input components at the same time and input must be "routed" to a specific component.
	 */
	isFocused: boolean;

	/**
	 * Select state.
	 */
	state: MultiSelectState;

	/**
	 * Options.
	 */
	options: Option[];

	/**
	 * Callback when user presses enter.
	 * First argument is an array of selected option values.
	 */
	onSubmit?: (value: string[]) => void;
};

export const useMultiSelect = ({
	isFocused,
	state,
	options,
	onSubmit,
}: UseMultiSelectProps) => {
	useInput(
		(input, key) => {
			if (key.downArrow) {
				state.focusNextOption();
			}

			if (key.upArrow) {
				state.focusPreviousOption();
			}

			if (input === ' ') {
				state.toggleFocusedOption();
			}

			if (key.return && state.selectedIndexes.length > 0) {
				const newValue = options
					.filter((_option, index) => {
						return state.selectedIndexes.includes(index);
					})
					.map(option => option.value);

				onSubmit?.(newValue);
			}
		},
		{isActive: isFocused},
	);
};
