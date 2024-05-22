import React, {type ReactNode} from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Option} from '../../types.js';
import {SelectOption} from './select-option.js';
import {useSelectState} from './use-select-state.js';
import {useSelect} from './use-select.js';
import {type Theme} from './theme.js';

export type SelectProps = {
	/**
	 * When disabled, user input is ignored.
	 *
	 * @default false
	 */
	readonly isDisabled?: boolean;

	/**
	 * Number of visible options.
	 *
	 * @default 5
	 */
	readonly visibleOptionCount?: number;

	/**
	 * Highlight text in option labels.
	 */
	readonly highlightText?: string;

	/**
	 * Options.
	 */
	readonly options: Option[];

	/**
	 * Default value.
	 */
	readonly defaultValue?: string;

	/**
	 * Callback when selected option changes.
	 */
	readonly onChange?: (value: string) => void;
};

export function Select({
	isDisabled = false,
	visibleOptionCount = 5,
	highlightText,
	options,
	defaultValue,
	onChange,
}: SelectProps) {
	const state = useSelectState({
		visibleOptionCount,
		options,
		defaultValue,
		onChange,
	});

	useSelect({isDisabled, state});

	const {styles} = useComponentTheme<Theme>('Select');

	return (
		<Box {...styles.container()}>
			{state.visibleOptions.map(option => {
				// eslint-disable-next-line prefer-destructuring
				let label: ReactNode = option.label;

				if (highlightText && option.label.includes(highlightText)) {
					const index = option.label.indexOf(highlightText);

					label = (
						<>
							{option.label.slice(0, index)}
							<Text {...styles.highlightedText()}>{highlightText}</Text>
							{option.label.slice(index + highlightText.length)}
						</>
					);
				}

				return (
					<SelectOption
						key={option.value}
						isFocused={!isDisabled && state.focusedValue === option.value}
						isSelected={state.value === option.value}
					>
						{label}
					</SelectOption>
				);
			})}
		</Box>
	);
}
