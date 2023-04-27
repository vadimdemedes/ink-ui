import React, {ReactNode} from 'react';
import {Box, Text} from 'ink';
import figures from 'figures';
import {useMultiStyleConfig} from '../theme.js';

export type SelectOptionProps = {
	/**
	 * Determines if option is focused.
	 */
	isFocused: boolean;

	/**
	 * Determines if option is selected.
	 */
	isSelected: boolean;

	/**
	 * Option label.
	 */
	children: ReactNode;
};

export function SelectOption({
	isFocused,
	isSelected,
	children,
}: SelectOptionProps) {
	const styles = useMultiStyleConfig('Select', {isFocused, isSelected});

	return (
		<Box {...styles['optionContainer']}>
			{(isFocused || isSelected) && (
				<Text {...styles['focusIndicator']}>
					{isSelected ? figures.tick : figures.pointer}
				</Text>
			)}

			<Text {...styles['optionLabel']}>{children}</Text>
		</Box>
	);
}
