import {Text, type TextProps} from 'ink';
import React, {type ReactNode} from 'react';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type BadgeProps = {
	/**
	 * Label.
	 */
	readonly children: ReactNode;

	/**
	 * Color.
	 *
	 * @default "magenta"
	 */
	readonly color?: TextProps['color'];
};

export function Badge({children, color = 'magenta'}: BadgeProps) {
	const {styles} = useComponentTheme<Theme>('Badge');

	let formattedChildren = children;

	if (typeof children === 'string') {
		formattedChildren = children.toUpperCase();
	}

	return (
		<Text {...styles.container({color})}>
			{' '}
			<Text {...styles.label()}>{formattedChildren}</Text>{' '}
		</Text>
	);
}
