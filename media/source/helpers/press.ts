import process from 'node:process';
import delay from 'delay';

export default async function press(character: string, times = 1) {
	for (let index = 0; index < times; index++) {
		process.stdin.emit('data', character);

		// eslint-disable-next-line no-await-in-loop
		await delay(200 * Math.random());
	}
}
