import {Box, Text} from 'ink';
import React, {useContext, type ReactNode} from 'react';
import {useComponentTheme} from '../../theme.js';
import {OrderedListItemContext} from './ordered-list-item-context.js';
import {type Theme} from './theme.js';

export type OrderedListItemProps = {
	/**
	 * List item content.
	 */
	children: ReactNode;
};

export function OrderedListItem({children}: OrderedListItemProps) {
	const {marker} = useContext(OrderedListItemContext);
	const {styles} = useComponentTheme<Theme>('OrderedList');

	return (
		<Box {...styles.listItem()}>
			<Text {...styles.marker()}>{marker}</Text>
			<Box {...styles.content()}>{children}</Box>
		</Box>
	);
}
