export { FFMpegExecutor as FFMegExecutor };

import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExec, CommandExecutor } from "../core/command-executor";
import { StreamLogger, StreamProxy } from "../core/stream-handler";
import { FileService } from "../core/file-service";
import { PromptService } from "../core/prompt-service";
import { FFMegArgumentsBuilder } from "./ffmpeg-builder";

interface FFMpegInput {
	width: number;
	height: number;
	path: string;
	name: string;
}

class FFMpegExecutor extends CommandExecutor<FFMpegInput> {

	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(logger: StreamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<FFMpegInput> {
		const width = await this.promptService.input<number>("Width:" , "number");
		const height = await this.promptService.input<number>("Height:" , "number");
		const path = await this.promptService.input<string>("Path:" , "input");
		const name = await this.promptService.input<string>("Name:" , "input");
		return { width, height, path, name };
	}

	protected build({ width, height, path, name}: FFMpegInput): CommandExec {
		const output = this.fileService.getFilePath(path, name, 'mp4');
		const args = (new FFMegArgumentsBuilder)
			.input(path)
			.setVideoSize(width, height)
			.output(output);
		return { command: 'ffmpeg', args, output };
	}

	protected spawn({ output, command: commmand, args }: CommandExec): ChildProcessWithoutNullStreams {
		this.fileService.deleteFileIfExists(output);
		return spawn(commmand, args)
	}

	protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger): void {
		const proxy = new StreamProxy(logger);
		proxy.processOutput(stream);
	}
	
}