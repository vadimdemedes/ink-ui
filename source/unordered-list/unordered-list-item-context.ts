import {createContext} from 'react';
import figures from 'figures';

export type UnorderedListItemContextProps = {
	/**
	 * Marker that's displayed before each list item.
	 */
	marker: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UnorderedListItemContext =
	createContext<UnorderedListItemContextProps>({
		marker: figures.line,
	});
