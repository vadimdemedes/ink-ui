import {Box, Text} from 'ink';
import React, {useContext, type ReactNode} from 'react';
import {useMultiStyleConfig} from '../theme.js';
import {UnorderedListItemContext} from './unordered-list-item-context.js';

export type UnorderedListItemProps = {
	/**
	 * List item content.
	 */
	children: ReactNode;
};

export function UnorderedListItem({children}: UnorderedListItemProps) {
	const {marker} = useContext(UnorderedListItemContext);
	const styles = useMultiStyleConfig('UnorderedList');

	return (
		<Box {...styles['listItem']}>
			<Text {...styles['marker']}>{marker}</Text>
			<Box {...styles['content']}>{children}</Box>
		</Box>
	);
}
