import {createContext} from 'react';
import figures from 'figures';

export type UnorderedListContextProps = {
	/**
	 * Markers that are displayed before each list item.
	 */
	markers: string[];

	/**
	 * Depth of the list.
	 */
	depth: number;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UnorderedListContext = createContext<UnorderedListContextProps>({
	markers: [figures.line],
	depth: 0,
});
