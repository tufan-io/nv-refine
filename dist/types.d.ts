import type { AnyVariables } from "urql";
import type { BaseKey, BaseRecord, CreateManyResponse, CreateResponse, CrudFilters, CrudSorting, DataProvider as RefineDataProvider, DeleteManyResponse, DeleteOneResponse, GetListResponse, GetManyResponse, GetOneResponse, MetaDataQuery, Pagination, UpdateManyResponse, UpdateResponse } from "@pankod/refine-core";
import type { Client } from "urql";
/**
 * We extend the DataProvider with an ability to add custom verbs.
 */
export interface DataProvider extends RefineDataProvider {
    verb: VerbProviders;
}
export type NounGql = {
    create: string;
    createMany: string;
    getList: string;
    getOne: string;
    getMany: string;
    update: string;
    updateMany: string;
    deleteOne: string;
    deleteMany: string;
};
export type NounProviders = {
    [name: string]: ResourceProvider;
};
export type VerbProviders = {
    [name: string]: <TData, TVariables>(client: Client, variables: TVariables, metaData?: MetaDataQuery) => Promise<TData>;
};
export interface ResourceProvider<$Resource extends BaseRecord = BaseRecord, $ResourceUncheckedCreateInput extends AnyVariables = AnyVariables, // createOne
$ResourceCreateManyInput extends AnyVariables = AnyVariables, // createMany
$ResourceUncheckedUpdateInput extends AnyVariables = AnyVariables, // updateOne
$ResourceUncheckedUpdateManyInput extends AnyVariables = AnyVariables, // updateMany
$ResourceWhereUniqueInput extends AnyVariables = AnyVariables> {
    create: <TData extends BaseRecord = $Resource, TVariables extends AnyVariables = $ResourceUncheckedCreateInput>(params: {
        client: Client;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<CreateResponse<TData>>;
    createMany?: <TData extends BaseRecord = $Resource, TVariables extends AnyVariables = $ResourceCreateManyInput>(params: {
        client: Client;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<CreateManyResponse<TData>>;
    getList: <TData extends BaseRecord = $Resource>(params: {
        client: Client;
        pagination?: Pagination;
        hasPagination?: boolean;
        sort?: CrudSorting;
        filters?: CrudFilters;
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetListResponse<TData>>;
    getMany?: <TData extends BaseRecord = $Resource>(params: {
        client: Client;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
    }) => Promise<GetManyResponse<TData>>;
    getOne: <TData extends BaseRecord = $Resource>(params: {
        client: Client;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<GetOneResponse<TData>>;
    update: <TData extends BaseRecord = $Resource, TVariables extends AnyVariables = $ResourceUncheckedUpdateInput>(params: {
        client: Client;
        id: BaseKey;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateResponse<TData>>;
    updateMany?: <TData extends BaseRecord = $Resource, TVariables extends AnyVariables = $ResourceUncheckedUpdateManyInput>(params: {
        client: Client;
        ids: BaseKey[];
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateManyResponse<TData>>;
    deleteOne: <TData extends BaseRecord = $Resource, TVariables = $ResourceWhereUniqueInput>(params: {
        client: Client;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<DeleteOneResponse<TData>>;
    deleteMany?: <TData extends BaseRecord = $Resource>(params: {
        client: Client;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
    }) => Promise<DeleteManyResponse<TData>>;
}
//# sourceMappingURL=types.d.ts.map