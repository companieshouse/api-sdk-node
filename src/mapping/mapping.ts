import camelCaseKeys, { Options } from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";

type ObjArray = { [key: string]: any; }[]
type Obj = { [key: string]: any; }
type ObjOptions = Obj | ObjArray;

export default class Mapping {
    public static camelCaseKeys<T> (input: any, options: Options = { deep: true }): T {
        return camelCaseKeys(input, options) as T;
    }

    public static snakeCaseKeys (input: ObjOptions, options: snakeCaseKeys.Options = { deep: true }) {
        return snakeCaseKeys(input, options);
    }
}
