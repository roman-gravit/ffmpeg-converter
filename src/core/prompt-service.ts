export { PromptService };

import inquirer from "inquirer";

type PromptType = "input" | "password" | "number";

class PromptService {
	async input<T>(message: string, type: PromptType): Promise<T> {
		const { result } = await inquirer.prompt< { result: T }>([
			{ type, name: "result", message }
		]);
		return result;
	}
}