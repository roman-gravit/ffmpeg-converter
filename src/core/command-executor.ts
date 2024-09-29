export { CommandExecutor, CommandExec };

import { ChildProcessWithoutNullStreams } from "child_process";
import { StreamLogger } from "./stream-handler";



interface CommandExec {
	command: string;
	args: string[];
	output: string;
}

abstract class  CommandExecutor <Input> {
	private logger: StreamLogger;
	
	constructor(logger: StreamLogger) {
		this.logger = logger;
	}

	async execute(): Promise<void> {
		const input = await this.prompt();
		const command = this.build(input);
		const stream = this.spawn(command);
		this.processStream(stream, this.logger);
	}

	protected abstract prompt(): Promise<Input>

	protected abstract build(input: Input): CommandExec

	protected abstract spawn(command: CommandExec): ChildProcessWithoutNullStreams;

	protected abstract processStream(stream: ChildProcessWithoutNullStreams,
									 logger: StreamLogger
									): void;

}