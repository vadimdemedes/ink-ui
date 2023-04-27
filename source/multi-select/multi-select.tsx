import React, {type ReactNode} from 'react';
import {Box, Text} from 'ink';
import {useMultiStyleConfig} from '../theme.js';
import {MultiSelectOption} from './multi-select-option.js';
import {useMultiSelectState} from './use-multi-select-state.js';
import {useMultiSelect} from './use-multi-select.js';
import {type Option} from './types.js';

export type MultiSelectProps = {
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
	 * Highlight text in option labels.
	 * Useful for filtering options.
	 */
	highlightText?: string;

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

	/**
	 * Callback when user presses enter.
	 * First argument is an array of selected option values.
	 */
	onSubmit?: (value: string[]) => void;
};

export function MultiSelect({
	isFocused = true,
	defaultLimit,
	highlightText,
	options,
	defaultValue,
	onChange,
	onSubmit,
}: MultiSelectProps) {
	const state = useMultiSelectState({
		defaultLimit,
		options,
		defaultValue,
		onChange,
	});

	useMultiSelect({isFocused, state, options, onSubmit});

	const styles = useMultiStyleConfig('MultiSelect');

	return (
		<Box {...styles['container']}>
			{state.visibleOptions.map(option => {
				// eslint-disable-next-line prefer-destructuring
				let label: ReactNode = option.label;

				if (highlightText && option.label.includes(highlightText)) {
					const index = option.label.indexOf(highlightText);

					label = (
						<>
							{option.label.slice(0, index)}
							<Text {...styles['highlightedText']}>{highlightText}</Text>
							{option.label.slice(index + highlightText.length)}
						</>
					);
				}

				return (
					<MultiSelectOption
						key={option.value}
						isFocused={state.focusedIndex === option.index}
						isSelected={state.selectedIndexes.includes(option.index)}
					>
						{label}
					</MultiSelectOption>
				);
			})}
		</Box>
	);
}
