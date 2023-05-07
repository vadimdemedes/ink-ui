import {Box, Text} from 'ink';
import React, {useContext, type ReactNode} from 'react';
import {useComponentTheme} from '../../theme.js';
import {UnorderedListItemContext} from './unordered-list-item-context.js';
import {type Theme} from './theme.js';

export type UnorderedListItemProps = {
	/**
	 * List item content.
	 */
	children: ReactNode;
};

export function UnorderedListItem({children}: UnorderedListItemProps) {
	const {marker} = useContext(UnorderedListItemContext);
	const {styles} = useComponentTheme<Theme>('UnorderedList');

	return (
		<Box {...styles.listItem()}>
			<Text {...styles.marker()}>{marker}</Text>
			<Box {...styles.content()}>{children}</Box>
		</Box>
	);
}
