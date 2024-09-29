export { FileService };

import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";


class FileService {

	public getFilePath(path: string, name: string, ext: string): string {
		if(!isAbsolute(path)) {
			path = join(__dirname + "/" + path);
		}
		return join(dirname(path) + "/" + name  + "." + ext)
	}

	async deleteFileIfExists(path: string): Promise<void> {
		if(await this.isExists(path)) {
			promises.unlink(path);
		}
	}

	private async isExists(path: string): Promise<boolean> {
		try {
			await promises.stat(path);
			return true;
		} catch {
			return false;
		}
	}

}