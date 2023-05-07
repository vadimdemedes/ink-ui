import {Box} from 'ink';
import React, {useMemo, type ReactNode, useContext} from 'react';
import {useComponentTheme} from '../../theme.js';
import {UnorderedListItem} from './unordered-list-item.js';
import {UnorderedListContext} from './unordered-list-context.js';
import {UnorderedListItemContext} from './unordered-list-item-context.js';
import {type Theme} from './theme.js';
import {defaultMarker} from './constants.js';

export type UnorderedListProps = {
	/**
	 * List items.
	 */
	children: ReactNode;
};

export function UnorderedList({children}: UnorderedListProps) {
	const {depth} = useContext(UnorderedListContext);
	const {styles, config} = useComponentTheme<Theme>('UnorderedList');

	const listContext = useMemo(
		() => ({
			depth: depth + 1,
		}),
		[depth],
	);

	const listItemContext = useMemo(() => {
		const {marker} = config();

		if (typeof marker === 'string') {
			return {marker};
		}

		if (Array.isArray(marker)) {
			return {
				marker: marker[depth] ?? marker[marker.length - 1] ?? defaultMarker,
			};
		}

		return {
			marker: defaultMarker,
		};
	}, [config, depth]);

	return (
		<UnorderedListContext.Provider value={listContext}>
			<UnorderedListItemContext.Provider value={listItemContext}>
				<Box {...styles.list()}>{children}</Box>
			</UnorderedListItemContext.Provider>
		</UnorderedListContext.Provider>
	);
}

UnorderedList.Item = UnorderedListItem;
