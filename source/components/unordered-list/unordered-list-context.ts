import {createContext} from 'react';

export type UnorderedListContextProps = {
	/**
	 * Depth of the list.
	 */
	depth: number;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UnorderedListContext = createContext<UnorderedListContextProps>({
	depth: 0,
});
