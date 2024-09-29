export { StreamProxy, StreamLogger };

import { ChildProcessWithoutNullStreams } from "child_process";

interface StreamLogger {
	log(...args: any[]): void;
	error(...args: any[]): void;
	close(): void;
}

class StreamProxy {
	private logger: StreamLogger;

	constructor(logger: StreamLogger) {
		this.logger = logger;
	}

	processOutput(stream: ChildProcessWithoutNullStreams) {
		stream.stdout.on("data", (data: any) => {
			this.logger.log(data.toString());
		});

		stream.stderr.on("data", (data: any) => {
			this.logger.error(data.toString());
		});

		stream.on("close", () => {
			this.logger.close();
		});
	}
}


 