import {Box, Text} from 'ink';
import React, {useContext, type ReactNode} from 'react';
import {useMultiStyleConfig} from '../theme.js';
import {OrderedListItemContext} from './ordered-list-item-context.js';

export type OrderedListItemProps = {
	/**
	 * List item content.
	 */
	children: ReactNode;
};

export function OrderedListItem({children}: OrderedListItemProps) {
	const {marker} = useContext(OrderedListItemContext);
	const styles = useMultiStyleConfig('OrderedList');

	return (
		<Box {...styles['listItem']}>
			<Text {...styles['marker']}>{marker}</Text>
			<Box {...styles['content']}>{children}</Box>
		</Box>
	);
}
