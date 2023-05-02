import {createContext} from 'react';

export type UnorderedListContextProps = {
	/**
	 * Marker that's displayed before each list item.
	 * If an array is provided, each nested list will use the next marker in that array.
	 */
	marker: string | string[] | undefined;

	/**
	 * Depth of the list.
	 */
	depth: number;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UnorderedListContext = createContext<UnorderedListContextProps>({
	marker: undefined,
	depth: 0,
});
