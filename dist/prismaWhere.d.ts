/**
 * This extracts a generalized Prisma `WhereInput`, which is the basis
 * for converting Refine filters into _Noun & Verb_ GraphQL API filters.
 */
export type WhereInput = {
    AND?: Enumerable<WhereInput>;
    OR?: Enumerable<WhereInput>;
    NOT?: Enumerable<WhereInput>;
} & {
    [field: string]: Filters;
};
export type Int = number;
export type Float = number;
export type Decimal = number;
export type DateTime = string;
export type Bytes = string;
export type BigInt = bigint;
export type Json = string | number | boolean | JsonObject | JsonArray | null;
export type JsonObject = {
    [Key in string]?: Json;
};
export interface JsonArray extends Array<Json> {
}
export type Enumerable<T> = T | Array<T>;
type Filters = StringFilters | DateTimeFilters | IntFilters | FloatFilters | DecimalFilters | BoolFilters | BigIntFilters | JsonFilters | BytesFilters;
type StringFilters = StringFilter | string;
type DateTimeFilters = string;
type IntFilters = IntFilter | number;
type FloatFilters = FloatFilter | number;
type DecimalFilters = DecimalFilter | number;
type BoolFilters = BoolFilter | boolean;
type BigIntFilters = BigIntFilter | bigint;
type JsonFilters = JsonFilter | string | number | boolean | JsonObject | JsonArray | null;
type BytesFilters = BytesFilter | string;
export type StringFilter = {
    equals?: String | null;
    in?: Array<String> | null;
    notIn?: Array<String> | null;
    lt?: String | null;
    lte?: String | null;
    gt?: String | null;
    gte?: String | null;
    contains?: String | null;
    startsWith?: String | null;
    endsWith?: String | null;
    not?: NestedStringFilter | null;
};
export type NestedStringFilter = {
    equals?: String | null;
    in?: Array<String> | null;
    notIn?: Array<String> | null;
    lt?: String | null;
    lte?: String | null;
    gt?: String | null;
    gte?: String | null;
    contains?: String | null;
    startsWith?: String | null;
    endsWith?: String | null;
    not?: NestedStringFilter | null;
};
export type DateTimeFilter = {
    equals?: DateTime | null;
    in?: Array<DateTime> | null;
    notIn?: Array<DateTime> | null;
    lt?: DateTime | null;
    lte?: DateTime | null;
    gt?: DateTime | null;
    gte?: DateTime | null;
    not?: NestedDateTimeFilter | null;
};
export type NestedDateTimeFilter = {
    equals?: DateTime | null;
    in?: Array<DateTime> | null;
    notIn?: Array<DateTime> | null;
    lt?: DateTime | null;
    lte?: DateTime | null;
    gt?: DateTime | null;
    gte?: DateTime | null;
    not?: NestedDateTimeFilter | null;
};
export type IntFilter = {
    equals?: Int | null;
    in?: Array<Int> | null;
    notIn?: Array<Int> | null;
    lt?: Int | null;
    lte?: Int | null;
    gt?: Int | null;
    gte?: Int | null;
    not?: NestedIntFilter | null;
};
export type NestedIntFilter = {
    equals?: Int | null;
    in?: Array<Int> | null;
    notIn?: Array<Int> | null;
    lt?: Int | null;
    lte?: Int | null;
    gt?: Int | null;
    gte?: Int | null;
    not?: NestedIntFilter | null;
};
export type FloatFilter = {
    equals?: Float | null;
    in?: Array<Float> | null;
    notIn?: Array<Float> | null;
    lt?: Float | null;
    lte?: Float | null;
    gt?: Float | null;
    gte?: Float | null;
    not?: NestedFloatFilter | null;
};
export type NestedFloatFilter = {
    equals?: Float | null;
    in?: Array<Float> | null;
    notIn?: Array<Float> | null;
    lt?: Float | null;
    lte?: Float | null;
    gt?: Float | null;
    gte?: Float | null;
    not?: NestedFloatFilter | null;
};
export type BoolFilter = {
    equals?: Boolean | null;
    not?: NestedBoolFilter | null;
};
export type NestedBoolFilter = {
    equals?: Boolean | null;
    not?: NestedBoolFilter | null;
};
export type BigIntFilter = {
    equals?: BigInt | null;
    in?: Array<BigInt> | null;
    notIn?: Array<BigInt> | null;
    lt?: BigInt | null;
    lte?: BigInt | null;
    gt?: BigInt | null;
    gte?: BigInt | null;
    not?: NestedBigIntFilter | null;
};
export type NestedBigIntFilter = {
    equals?: BigInt | null;
    in?: Array<BigInt> | null;
    notIn?: Array<BigInt> | null;
    lt?: BigInt | null;
    lte?: BigInt | null;
    gt?: BigInt | null;
    gte?: BigInt | null;
    not?: NestedBigIntFilter | null;
};
export type DecimalFilter = {
    equals?: Decimal | null;
    in?: Array<Decimal> | null;
    notIn?: Array<Decimal> | null;
    lt?: Decimal | null;
    lte?: Decimal | null;
    gt?: Decimal | null;
    gte?: Decimal | null;
    not?: NestedDecimalFilter | null;
};
export type NestedDecimalFilter = {
    equals?: Decimal | null;
    in?: Array<Decimal> | null;
    notIn?: Array<Decimal> | null;
    lt?: Decimal | null;
    lte?: Decimal | null;
    gt?: Decimal | null;
    gte?: Decimal | null;
    not?: NestedDecimalFilter | null;
};
export type JsonFilter = {
    equals?: JsonNullValueFilter | null;
    path?: String | null;
    string_contains?: String | null;
    string_starts_with?: String | null;
    string_ends_with?: String | null;
    array_contains?: Json | null;
    array_starts_with?: Json | null;
    array_ends_with?: Json | null;
    lt?: Json | null;
    lte?: Json | null;
    gt?: Json | null;
    gte?: Json | null;
    not?: JsonNullValueFilter | null;
};
export declare enum JsonNullValueFilter {
    DbNull = "DbNull",
    JsonNull = "JsonNull",
    AnyNull = "AnyNull"
}
export type BytesFilter = {
    equals?: Bytes | null;
    in?: Array<Bytes> | null;
    notIn?: Array<Bytes> | null;
    not?: NestedBytesFilter | null;
};
export type NestedBytesFilter = {
    equals?: Bytes | null;
    in?: Array<Bytes> | null;
    notIn?: Array<Bytes> | null;
    not?: NestedBytesFilter | null;
};
export {};
//# sourceMappingURL=prismaWhere.d.ts.map