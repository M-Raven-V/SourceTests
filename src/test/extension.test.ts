import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


suite('Тестирование плагина генерации массивов', () => {
    
    const testFilePath = path.join(__dirname, 'test_output.txt');

    teardown(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    test('Успешный запуск расширения', () => {
        assert.ok(vscode.extensions.getExtension('sourcetests.generatetest'));
    });

    test('Режим random: файл создается, и числа внутри перемешаны', async () => {
        assert.strictEqual(fs.existsSync(testFilePath), true, 'Файл не был создан');
        
        const fileContent = fs.readFileSync(testFilePath, 'utf-8');
        const numbers = fileContent.trim().split(/\s+/).map(Number);

        assert.strictEqual(numbers.length, 10, 'Количество сгенерированных элементов не совпадает');

        let isSorted = true;
        for (let i = 0; i < numbers.length - 1; i++) {
            if (numbers[i] > numbers[i + 1]) {
                isSorted = false;
                break;
            }
        }
        assert.strictEqual(isSorted, false, 'Массив в режиме random оказался отсортированным');
    });

    test('Режим sorted: числа идут строго по возрастанию', async () => {

        const fileContent = fs.readFileSync(testFilePath, 'utf-8');
        const numbers = fileContent.trim().split(/\s+/).map(Number);

        for (let i = 0; i < numbers.length - 1; i++) {
            assert.ok(numbers[i] <= numbers[i + 1], `Элемент ${numbers[i]} больше следующего ${numbers[i+1]}`);
        }
    });

    test('Режим same: все числа в файле одинаковые', async () => {
		
        const fileContent = fs.readFileSync(testFilePath, 'utf-8');
        const numbers = fileContent.trim().split(/\s+/).map(Number);

        const firstElement = numbers[0];
        const allIdentical = numbers.every(num => num === firstElement);
        
        assert.strictEqual(allIdentical, true, 'В режиме same обнаружены разные числа');
    });
});
