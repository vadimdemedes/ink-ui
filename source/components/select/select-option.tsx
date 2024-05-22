import React, {type ReactNode} from 'react';
import {Box, Text} from 'ink';
import figures from 'figures';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type SelectOptionProps = {
	/**
	 * Determines if option is focused.
	 */
	readonly isFocused: boolean;

	/**
	 * Determines if option is selected.
	 */
	readonly isSelected: boolean;

	/**
	 * Option label.
	 */
	readonly children: ReactNode;
};

export function SelectOption({
	isFocused,
	isSelected,
	children,
}: SelectOptionProps) {
	const {styles} = useComponentTheme<Theme>('Select');

	return (
		<Box {...styles.option({isFocused})}>
			{isFocused && <Text {...styles.focusIndicator()}>{figures.pointer}</Text>}

			<Text {...styles.label({isFocused, isSelected})}>{children}</Text>

			{isSelected && (
				<Text {...styles.selectedIndicator()}>{figures.tick}</Text>
			)}
		</Box>
	);
}
