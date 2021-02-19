import camelCaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";

type ObjArray = { [key: string]: any; }[]
type Obj = { [key: string]: any; }
type ObjOptions = Obj | ObjArray;

export default class Mapping {
    public static camelCaseKeys<T> (input: any): T {
        return camelCaseKeys(input, { deep: true }) as T;
    }

    public static snakeCaseKeys (input: ObjOptions) {
        return snakeCaseKeys(input, { deep: true });
    }
}
