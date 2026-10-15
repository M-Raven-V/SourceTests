export type TestMode = "random" | "sorted" | "same";

export interface TestConfig {
    size: number;
    min: number;
    max: number;
    mode: TestMode;
}

export function generateArray(config: TestConfig): number[] {
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