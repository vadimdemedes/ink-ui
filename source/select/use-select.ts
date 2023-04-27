import {useInput} from 'ink';
import {type SelectState} from './use-select-state.js';
import {type Option} from './types.js';

export type UseSelectProps = {
	/**
	 * Listen to user's input. Useful in case there are multiple input components at the same time and input must be "routed" to a specific component.
	 */
	isFocused: boolean;

	/**
	 * Select state.
	 */
	state: SelectState;

	/**
	 * Options.
	 */
	options: Option[];
};

export const useSelect = ({isFocused, state}: UseSelectProps) => {
	useInput(
		(input, key) => {
			if (key.downArrow) {
				state.focusNextOption();
			}

			if (key.upArrow) {
				state.focusPreviousOption();
			}

			if (input === ' ' || key.return) {
				state.selectFocusedOption();
			}
		},
		{isActive: isFocused},
	);
};
