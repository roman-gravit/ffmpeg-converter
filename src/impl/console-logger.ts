export { ConsoleLogger };

import { StreamLogger } from "../core/stream-handler";

class ConsoleLogger implements StreamLogger {
	private static logger: ConsoleLogger | undefined;

	private constructor() {}
	
	static getLogger(): ConsoleLogger {
		if(!this.logger) {
			this.logger = new ConsoleLogger();
		}
		return this.logger;
	}
	
	log(...args: any[]): void {
		console.log(...args);
	}

	error(...args: any[]): void {
		console.error(...args);
	}

	close(): void {
		console.log("Done!");
	}

}