import camelCaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";

export default class Mapping {
    public static camelCaseKeys<T> (input: any): T {
        return camelCaseKeys(input, { deep: true }) as T;
    }

    public static snakeCaseKeys<T> (input: any): T {
        return snakeCaseKeys(input, { deep: true }) as T;
    }
}
