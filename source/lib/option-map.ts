import {type Option} from '../types.js';

type OptionMapItem = Option & {
	previous: OptionMapItem | undefined;
	next: OptionMapItem | undefined;
	index: number;
};

export default class OptionMap extends Map<string, OptionMapItem> {
	readonly first: OptionMapItem | undefined;

	constructor(options: Option[]) {
		const items: Array<[string, OptionMapItem]> = [];
		let firstItem: OptionMapItem | undefined;
		let previous: OptionMapItem | undefined;
		let index = 0;

		for (const option of options) {
			const item = {
				...option,
				previous,
				next: undefined,
				index,
			};

			if (previous) {
				previous.next = item;
			}

			firstItem ||= item;

			items.push([option.value, item]);
			index++;
			previous = item;
		}

		super(items);
		this.first = firstItem;
	}
}
