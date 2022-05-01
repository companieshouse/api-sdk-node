declare type ObjArray = {
    [key: string]: any;
}[];
declare type Obj = {
    [key: string]: any;
};
declare type ObjOptions = Obj | ObjArray;
export default class Mapping {
    static camelCaseKeys<T>(input: any): T;
    static snakeCaseKeys(input: ObjOptions): {
        [key: string]: any;
    };
}
export {};
