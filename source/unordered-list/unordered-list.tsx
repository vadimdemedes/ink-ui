import {Box} from 'ink';
import React, {useMemo, type ReactNode, useContext} from 'react';
import figures from 'figures';
import {useMultiStyleConfig} from '../theme.js';
import {UnorderedListItem} from './unordered-list-item.js';
import {UnorderedListContext} from './unordered-list-context.js';
import {UnorderedListItemContext} from './unordered-list-item-context.js';

const defaultMarker = figures.line;

export type UnorderedListProps = {
	/**
	 * List items.
	 */
	children: ReactNode;

	/**
	 * Marker that's displayed before each list item.
	 * If an array is provided, each nested list will use the next marker in that array.
	 *
	 * @default "─"
	 */
	marker?: string | string[];
};

export function UnorderedList({children, marker}: UnorderedListProps) {
	const {depth, markers} = useContext(UnorderedListContext);
	const styles = useMultiStyleConfig('UnorderedList');

	const listContext = useMemo(
		() => ({
			markers: Array.isArray(marker) ? marker : [marker ?? figures.line],
			depth: depth + 1,
		}),
		[marker, depth],
	);

	const listItemContext = useMemo(() => {
		if (typeof marker === 'string') {
			return {marker};
		}

		if (Array.isArray(marker)) {
			return {
				marker: marker[depth] ?? defaultMarker,
			};
		}

		return {
			marker: markers[depth] ?? defaultMarker,
		};
	}, [marker, markers, depth]);

	return (
		<UnorderedListContext.Provider value={listContext}>
			<UnorderedListItemContext.Provider value={listItemContext}>
				<Box {...styles['list']}>{children}</Box>
			</UnorderedListItemContext.Provider>
		</UnorderedListContext.Provider>
	);
}

UnorderedList.Item = UnorderedListItem;
