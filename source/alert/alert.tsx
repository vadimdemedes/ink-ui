import React, {type ReactNode} from 'react';
import {Box, Text} from 'ink';
import figures from 'figures';
import {useMultiStyleConfig} from '../theme.js';

export type AlertProps = {
	/**
	 * Message.
	 */
	children: ReactNode;

	/**
	 * Variant.
	 */
	variant: 'info' | 'success' | 'error' | 'warning';

	/**
	 * Title.
	 */
	title?: string;
};

export function Alert({children, variant, title}: AlertProps) {
	const styles = useMultiStyleConfig('Alert', {variant});
	let icon: string | undefined;

	if (variant === 'info') {
		icon = figures.info;
	}

	if (variant === 'success') {
		icon = figures.tick;
	}

	if (variant === 'error') {
		icon = figures.cross;
	}

	if (variant === 'warning') {
		icon = figures.warning;
	}

	return (
		<Box {...styles['container']}>
			<Box {...styles['iconContainer']}>
				<Text {...styles['icon']}>{icon}</Text>
			</Box>

			<Box {...styles['content']}>
				{title && <Text {...styles['title']}>{title}</Text>}
				<Text {...styles['message']}>{children}</Text>
			</Box>
		</Box>
	);
}
