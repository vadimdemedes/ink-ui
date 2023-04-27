import React, {ReactNode} from 'react';
import {Box, Text} from 'ink';
import {useSpinner, UseSpinnerProps} from './use-spinner.js';
import {useMultiStyleConfig} from '../theme.js';

export type SpinnerProps = UseSpinnerProps & {
	/**
	 * Label to show near the spinner.
	 */
	label?: ReactNode;
};

export function Spinner({label, type}: SpinnerProps) {
	const {frame} = useSpinner({type});
	const styles = useMultiStyleConfig('Spinner');

	return (
		<Box {...styles['root']}>
			<Text {...styles['frame']}>{frame}</Text>
			{label && <Text {...styles['label']}>{label}</Text>}
		</Box>
	);
}
