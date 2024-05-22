import React, {type ReactNode} from 'react';
import {Box, Text} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';
import {type StatusMessageVariant} from './types.js';

export type StatusMessageProps = {
	/**
	 * Message.
	 */
	readonly children: ReactNode;

	/**
	 * Variant, which determines the color used in the status message.
	 */
	readonly variant: StatusMessageVariant;
};

export function StatusMessage({children, variant}: StatusMessageProps) {
	const {styles, config} = useComponentTheme<Theme>('StatusMessage');

	return (
		<Box {...styles.container()}>
			<Box {...styles.iconContainer()}>
				<Text {...styles.icon({variant})}>{config({variant}).icon}</Text>
			</Box>

			<Text {...styles.message()}>{children}</Text>
		</Box>
	);
}
