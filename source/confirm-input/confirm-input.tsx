import React from 'react';
import {Text, useInput} from 'ink';
import {useMultiStyleConfig} from '../theme.js';

export type ConfirmInputProps = {
	/**
	 * Listen to user's input. Useful in case there are multiple input components
	 * at the same time and input must be "routed" to a specific component.
	 *
	 * @default true
	 */
	isFocused?: boolean;

	/**
	 * Default choice.
	 *
	 * @default "confirm"
	 */
	defaultChoice?: 'confirm' | 'cancel';

	/**
	 * Confirm or cancel when user presses enter, depending on the `defaultChoice` value.
	 * Can be useful to disable when an explicit confirmation is required, such as pressing "Y" key.
	 *
	 * @default true
	 */
	submitOnEnter?: boolean; // eslint-disable-line react/boolean-prop-naming

	/**
	 * Callback to trigger on confirmation.
	 */
	onConfirm: () => void;

	/**
	 * Callback to trigger on cancellation.
	 */
	onCancel: () => void;
};

export function ConfirmInput({
	isFocused = true,
	defaultChoice = 'confirm',
	submitOnEnter = true,
	onConfirm,
	onCancel,
}: ConfirmInputProps) {
	useInput(
		(input, key) => {
			if (input.toLowerCase() === 'y') {
				onConfirm();
			}

			if (input.toLowerCase() === 'n') {
				onCancel();
			}

			if (key.return && submitOnEnter) {
				if (defaultChoice === 'confirm') {
					onConfirm();
				} else {
					onCancel();
				}
			}
		},
		{isActive: isFocused},
	);

	const styles = useMultiStyleConfig('ConfirmInput', {isFocused});

	return (
		<Text {...styles['container']}>
			{defaultChoice === 'confirm' ? 'Y/n' : 'y/N'}
		</Text>
	);
}
