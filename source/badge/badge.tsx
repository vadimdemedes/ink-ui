import {Text, type TextProps} from 'ink';
import React, {type ReactNode} from 'react';
import {useMultiStyleConfig} from '../theme.js';

export type BadgeProps = {
	/**
	 * Label.
	 */
	children: ReactNode;

	/**
	 * Color.
	 *
	 * @default "magenta"
	 */
	color?: TextProps['color'];
};

export function Badge({children, color = 'magenta'}: BadgeProps) {
	const styles = useMultiStyleConfig('Badge', {color});

	let formattedChildren: ReactNode = children;

	if (typeof children === 'string') {
		formattedChildren = children.toUpperCase();
	}

	return (
		<Text {...styles['root']}>
			{' '}
			<Text {...styles['label']}>{formattedChildren}</Text>{' '}
		</Text>
	);
}
