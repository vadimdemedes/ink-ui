import React from 'react';
import {Text, useInput} from 'ink';
import {useComponentTheme} from '../../theme.js';
import {type Theme} from './theme.js';

export type ConfirmInputProps = {
	/**
	 * When disabled, user input is ignored.
	 *
	 * @default false
	 */
	isDisabled?: boolean;

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
	isDisabled = false,
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
		{isActive: !isDisabled},
	);

	const {styles} = useComponentTheme<Theme>('ConfirmInput');

	return (
		<Text {...styles.input({isFocused: !isDisabled})}>
			{defaultChoice === 'confirm' ? 'Y/n' : 'y/N'}
		</Text>
	);
}
