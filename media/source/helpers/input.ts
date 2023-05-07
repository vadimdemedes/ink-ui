import process from 'node:process';
import delay from 'delay';

export default async function input(characters: string) {
	for (const character of characters) {
		process.stdin.emit('data', character);

		// eslint-disable-next-line no-await-in-loop
		await delay(200 * Math.random());
	}
}
