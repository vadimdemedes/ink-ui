import React, {type ReactNode} from 'react';
import {Box, Text} from 'ink';
import figures from 'figures';
import {useMultiStyleConfig} from '../theme.js';

export type MultiSelectOptionProps = {
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

export function MultiSelectOption({
	isFocused,
	isSelected,
	children,
}: MultiSelectOptionProps) {
	const styles = useMultiStyleConfig('MultiSelect', {isFocused, isSelected});

	return (
		<Box {...styles['option']}>
			{isFocused && (
				<Text {...styles['focusIndicator']}>{figures.pointer}</Text>
			)}

			<Text {...styles['label']}>{children}</Text>

			{isSelected && (
				<Text {...styles['selectedIndicator']}>{figures.tick}</Text>
			)}
		</Box>
	);
}
