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
	defaultChoice?: 'confirm' | 'cancel' | 'unset';

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
	const choicePrompts = {
		confirm: 'Y/n',
		cancel: 'y/N',
		unset: 'y/n',
	};

	useInput(
		(input, key) => {
			if (input.toLowerCase() === 'y') {
				onConfirm();
			}

			if (input.toLowerCase() === 'n') {
				onCancel();
			}

			if (key.return && submitOnEnter) {
				switch (defaultChoice) {
					case 'confirm': {
						onConfirm();
						break;
					}

					case 'cancel': {
						onCancel();
						break;
					}

					default: {
						break;
					}
				}
			}
		},
		{isActive: !isDisabled},
	);

	const {styles} = useComponentTheme<Theme>('ConfirmInput');

	return (
		<Text {...styles.input({isFocused: !isDisabled})}>
			{choicePrompts[defaultChoice]}
		</Text>
	);
}
