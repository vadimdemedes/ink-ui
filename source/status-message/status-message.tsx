import React, {type ReactNode} from 'react';
import {Box, Text} from 'ink';
import figures from 'figures';
import {useMultiStyleConfig} from '../theme.js';

export type StatusMessageProps = {
	/**
	 * Message.
	 */
	children: ReactNode;

	/**
	 * Variant.
	 */
	variant: 'info' | 'success' | 'error' | 'warning';
};

export function StatusMessage({children, variant}: StatusMessageProps) {
	const styles = useMultiStyleConfig('StatusMessage', {variant});
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

			<Text {...styles['message']}>{children}</Text>
		</Box>
	);
}
