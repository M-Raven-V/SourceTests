export type TestMode = "random" | "sorted" | "same";
    /**
        * Определяет доступные режимы генерации тестового массива.
        *
        * Значения:
        *     "random": генерация случайных чисел.
        *     "sorted": генерация случайных чисел с сортировкой по возрастанию.
        *     "same": генерация массива из одинаковых чисел.
    */

export interface TestConfig {
    /**
        * Описывает параметры генерации тестового массива.
        *
        * Поля:
        *     size (number): количество элементов массива.
        *     min (number): минимальное значение элемента.
        *     max (number): максимальное значение элемента.
        *     mode (TestMode): режим генерации массива.
    */
    size: number;
    min: number;
    max: number;
    mode: TestMode;
}


export function generateArray(config: TestConfig): number[] {
    /**
        * Генерирует тестовый числовой массив в соответствии с заданными параметрами.
        *
        * Параметры:
        *     config (TestConfig): объект с размером массива, минимальным и максимальным значениями и режимом генерации.
        *
        * Возвращаемое значение:
        *     number[]: массив целых чисел, сгенерированный в соответствии с выбранным режимом.
        *
        * Исключения:
        *     Error: если размер массива или границы диапазона некорректны.
    */
    const {size, min, max, mode} = config;

    if (!Number.isInteger(size) || size < 1 || size > 100_000) {
        throw new Error("Размер должен быть от 1 до 100000");
    }

    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new Error("Границы могут быть только целыми числами");
    }

    if (min > max) {
        throw new Error("Минимум не должен превышать максимум");
    }

    const values: number[] = [];

    if (mode === "same") {
        const value = Math.floor(Math.random() * (max - min + 1)) + min;

        for (let i = 0; i < size; i++) {
            values.push(value);
        }

        return values;
    }

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        values.push(value);
    }

    if (mode === "sorted") {
        values.sort((a, b) => a - b);
    }

    return values;
}