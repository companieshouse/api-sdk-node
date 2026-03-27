import { Options } from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";
type ObjArray = {
    [key: string]: any;
}[];
type Obj = {
    [key: string]: any;
};
type ObjOptions = Obj | ObjArray;
export default class Mapping {
    static camelCaseKeys<T>(input: any, options?: Options): T;
    static snakeCaseKeys(input: ObjOptions, options?: snakeCaseKeys.Options): {
        [key: string]: any;
    };
}
export {};
