export interface TestConfig {
    size: number;
    min: number;
    max: number;
}

export function validateConfig(config: TestConfig): string | null {
    /**
        * Проверяет корректность параметров генерации тестового массива.   
        *
        * Параметры:
        *     config (TestConfig): объект, содержащий размер массива, минимальное и максимальное значения.
        *
        * Возвращаемое значение:
        *     string | null: сообщение об ошибке, если параметры некорректны, или null, если все проверки пройдены успешно.
     */
    const {size, min, max} = config;

    if (!Number.isInteger(size) || size < 1 || size > 100_000) {
        return "Размер массива должен быть от 1 до 100000.";
    }

    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        return "Границы могут быть только целыми числами.";
    }

    if (min < -2_147_483_648 || max > 2_147_483_647) {
        return "Значения выходят за диапазон типа int.";
    }

    if (min > max) {
        return "Минимум не может быть больше максимума.";
    }

    return null;
}