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
	const {depth, marker: inheritedMarker} = useContext(UnorderedListContext);
	const styles = useMultiStyleConfig('UnorderedList');

	const listContext = useMemo(() => {
		if (typeof marker === 'string' || Array.isArray(marker)) {
			return {
				marker,
				depth: depth + 1,
			};
		}

		return {
			marker: inheritedMarker,
			depth: depth + 1,
		};
	}, [marker, inheritedMarker, depth]);

	const listItemContext = useMemo(() => {
		if (typeof marker === 'string') {
			return {marker};
		}

		if (Array.isArray(marker)) {
			return {
				marker: marker[depth] ?? defaultMarker,
			};
		}

		if (typeof inheritedMarker === 'string') {
			return {
				marker: inheritedMarker,
			};
		}

		if (Array.isArray(inheritedMarker)) {
			return {
				marker: inheritedMarker[depth] ?? defaultMarker,
			};
		}

		return {
			marker: defaultMarker,
		};
	}, [marker, inheritedMarker, depth]);

	return (
		<UnorderedListContext.Provider value={listContext}>
			<UnorderedListItemContext.Provider value={listItemContext}>
				<Box {...styles['list']}>{children}</Box>
			</UnorderedListItemContext.Provider>
		</UnorderedListContext.Provider>
	);
}

UnorderedList.Item = UnorderedListItem;
