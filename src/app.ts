export { App }; 

import { ConsoleLogger } from "./impl/console-logger";
import { FFMegExecutor } from "./impl/ffmpeg-executor";

class App {
	async run() {
		new FFMegExecutor(ConsoleLogger.getLogger()).execute()
	}
}

const app = new App();
app.run();