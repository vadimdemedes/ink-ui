import {useEffect, useState} from 'react';
import spinners, {type SpinnerName} from 'cli-spinners';

export type UseSpinnerProps = {
	/**
	 * Type of a spinner.
	 * See [cli-spinners](https://github.com/sindresorhus/cli-spinners) for available spinners.
	 *
	 * @default dots
	 */
	type?: SpinnerName;
};

export type UseSpinnerResult = {
	frame: string;
};

export function useSpinner({type = 'dots'}: UseSpinnerProps): UseSpinnerResult {
	const [frame, setFrame] = useState(0);
	const spinner = spinners[type];

	useEffect(() => {
		const timer = setInterval(() => {
			setFrame(previousFrame => {
				const isLastFrame = previousFrame === spinner.frames.length - 1;
				return isLastFrame ? 0 : previousFrame + 1;
			});
		}, spinner.interval);

		return () => {
			clearInterval(timer);
		};
	}, [spinner]);

	return {
		frame: spinner.frames[frame] ?? '',
	};
}
