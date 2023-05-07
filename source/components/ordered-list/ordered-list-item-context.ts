import {createContext} from 'react';
import figures from 'figures';

export type OrderedListItemContextProps = {
	/**
	 * Marker that's displayed before each list item.
	 */
	marker: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrderedListItemContext =
	createContext<OrderedListItemContextProps>({
		marker: figures.line,
	});
