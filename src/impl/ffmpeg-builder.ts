export { FFMegArgumentsBuilder };

class FFMegArgumentsBuilder {

	private inputPath = "";
	private options = new Map<string, string>();

	constructor() {
		this.options.set('-c:v', 'libx264');
	}

	input(inputPath: string): this {
		this.inputPath = inputPath;
		return this;
	}

	output(outputPath: string): string[] {
		if (!this.inputPath) {
			throw new Error('Не задан параметр input');
		}
		const args: string[] = ['-i', this.inputPath];
		this.options.forEach((value, key) => {
			args.push(key);
			args.push(value);
		});
		args.push(outputPath);
		return args;
	}
	
	setVideoSize(width: number, height: number): this {
		this.options.set('-s', `${width}x${height}`);
		return this;
	}

}