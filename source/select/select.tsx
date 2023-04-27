import React from 'react';
import {Box} from 'ink';
import {useMultiStyleConfig} from '../theme.js';
import {SelectOption} from './select-option.js';
import {useSelectState} from './use-select-state.js';
import {useSelect} from './use-select.js';
import {type Option} from './types.js';

export type SelectProps = {
	/**
	 * Listen to user's input. Useful in case there are multiple input components at the same time and input must be "routed" to a specific component.
	 *
	 * @default true
	 */
	isFocused?: boolean;

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
	onChange: (value: string) => void;
};

export function Select({
	isFocused = true,
	defaultLimit,
	options,
	defaultValue,
	onChange,
}: SelectProps) {
	const state = useSelectState({defaultLimit, options, defaultValue, onChange});
	useSelect({isFocused, state, options});

	const styles = useMultiStyleConfig('Select');

	return (
		<Box {...styles['container']}>
			{state.visibleOptions.map(option => (
				<SelectOption
					key={option.value}
					isFocused={state.focusedIndex === option.index}
					isSelected={state.selectedIndex === option.index}
				>
					{option.label}
				</SelectOption>
			))}
		</Box>
	);
}
