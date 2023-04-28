import {Box} from 'ink';
import React, {type ReactNode, useContext, isValidElement} from 'react';
import {useMultiStyleConfig} from '../theme.js';
import {OrderedListItem} from './ordered-list-item.js';
import {OrderedListContext} from './ordered-list-context.js';
import {OrderedListItemContext} from './ordered-list-item-context.js';

export type OrderedListProps = {
	/**
	 * List items.
	 */
	children: ReactNode;
};

export function OrderedList({children}: OrderedListProps) {
	const {marker: parentMarker} = useContext(OrderedListContext);
	const styles = useMultiStyleConfig('OrderedList');

	let numberOfItems = 0;

	for (const child of React.Children.toArray(children)) {
		if (!isValidElement(child) || child.type !== OrderedListItem) {
			continue;
		}

		numberOfItems++;
	}

	const maxMarkerWidth = String(numberOfItems).length;

	return (
		<Box {...styles['list']}>
			{React.Children.map(children, (child, index) => {
				if (!isValidElement(child) || child.type !== OrderedListItem) {
					return child;
				}

				const paddedMarker = `${String(index + 1).padStart(maxMarkerWidth)}.`;
				const marker = `${parentMarker}${paddedMarker}`;

				return (
					// eslint-disable-next-line react/jsx-no-constructed-context-values
					<OrderedListContext.Provider value={{marker}}>
						{/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
						<OrderedListItemContext.Provider value={{marker}}>
							{child}
						</OrderedListItemContext.Provider>
					</OrderedListContext.Provider>
				);
			})}
		</Box>
	);
}

OrderedList.Item = OrderedListItem;
