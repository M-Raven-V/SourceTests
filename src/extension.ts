import * as vscode from "vscode";
import {generateArray, TestMode} from "./generator";

export function activate(context: vscode.ExtensionContext) {
    const command = vscode.commands.registerCommand("sourcetests.generatetest", async () => {
            const sizeInput = await vscode.window.showInputBox({
                prompt: "Количество элементов массива",
                value: "9",
                validateInput: (value) => {
                    const n = Number(value);

                    return Number.isInteger(n) && n >= 1 && n <= 100000
                        ? null
                        : "Введите целое число от 1 до 100000";
                }
            });

            if (sizeInput === undefined) {
                return;
            }

            const minInput = await vscode.window.showInputBox({
                prompt: "Минимальное значение",
                value: "-100",
                validateInput: (value) => {
                    Number.isSafeInteger(Number(value))
                        ? null
                        : "Введите целое число";
				}
            });

            if (minInput === undefined) {
                return;
            }

            const maxInput = await vscode.window.showInputBox({
                prompt: "Максимальное значение",
                value: "100",
                validateInput: (value) => {
                    Number.isSafeInteger(Number(value))
                        ? null
                        : "Введите целое число";
				}
            });

            if (maxInput === undefined) {
				return;
			}

            const modeChoice = await vscode.window.showQuickPick(
                [
                    {label: "Массив из случайных элементов", value: "random"},
                    {label: "Отсортированный по возрастанию массив", value: "sorted"},
                    {label: "Массив из одинаковых элементов", value: "same"}
                ],
                {placeHolder: "Выберите режим генерации"}
            );

            if (!modeChoice) {
                return;
            }

            try {
                const values = generateArray({
                    size: Number(sizeInput),
                    min: Number(minInput),
                    max: Number(maxInput),
                    mode: modeChoice.value as TestMode
                });

                const folders = vscode.workspace.workspaceFolders;

                if (!folders || folders.length === 0) {
                    vscode.window.showErrorMessage(
                        "Сначала откройте папку проекта."
                    );
                    return;
                }

                const content = `${values.length}\n${values.join(" ")}\n`;
                const file = vscode.Uri.joinPath(
                    folders[0].uri,
                    "input.txt"
                );

                await vscode.workspace.fs.writeFile(
                    file,
                    Buffer.from(content, "utf8")
                );

                vscode.window.showInformationMessage(
                    "SourceTests: тест сохранён в input.txt"
                );
            } catch (error) {
                const message = error instanceof Error
                    ? error.message
                    : "Неизвестная ошибка";

                vscode.window.showErrorMessage(message);
            }
        }
    );

    context.subscriptions.push(command);
}

export function deactivate() {}