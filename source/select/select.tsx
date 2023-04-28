import React, {type ReactNode} from 'react';
import {Box, Text} from 'ink';
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
	 * Number of options to display at once.
	 *
	 * @default 6
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
	 * Initially selected option's value.
	 */
	defaultValue?: string;

	/**
	 * Callback when selected option changes.
	 */
	onChange?: (value: string) => void;
};

export function Select({
	isFocused = true,
	defaultLimit = 6,
	highlightText,
	options,
	defaultValue,
	onChange,
}: SelectProps) {
	const state = useSelectState({defaultLimit, options, defaultValue, onChange});
	useSelect({isFocused, state});

	const styles = useMultiStyleConfig('Select');

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
					<SelectOption
						key={option.value}
						isFocused={state.focusedIndex === option.index}
						isSelected={state.selectedIndex === option.index}
					>
						{label}
					</SelectOption>
				);
			})}
		</Box>
	);
}

Select.Option = SelectOption;
