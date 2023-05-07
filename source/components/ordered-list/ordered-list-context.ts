import {createContext} from 'react';

export type OrderedListContextProps = {
	/**
	 * Marker from the parent list.
	 */
	marker: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrderedListContext = createContext<OrderedListContextProps>({
	marker: '',
});
