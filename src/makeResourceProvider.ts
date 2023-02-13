import type { BaseKey, BaseRecord } from "@pankod/refine-core";
import { AnyVariables } from "urql";
import { NounGql, ResourceProvider } from "./types";
import { toPrismaFilters } from "./toPrismaFilter";

type getPkFn = <Resource extends BaseRecord>(resource: Resource) => BaseKey;
type whereFn = (id: string | number) => { [k: string]: unknown };

export const makeResourceProvider = <
  $Resource extends BaseRecord,
  $ResourceUncheckedCreateInput extends AnyVariables, // createOne
  $ResourceCreateManyInput extends AnyVariables, // createMany
  $ResourceUncheckedUpdateInput extends AnyVariables, // updateOne
  $ResourceUncheckedUpdateManyInput extends AnyVariables, // updateMany
  $ResourceWhereUniqueInput extends AnyVariables // deleteOne
>({
  caseInsensitive,
  getPk = (resource) => resource.id!,
  where = (id: string | number): { [k: string]: unknown } => ({ id }),
  nounGql,
}: {
  caseInsensitive: boolean;
  getPk: getPkFn;
  where: whereFn;
  nounGql: NounGql;
}) => {
  const $ResourceProvider: ResourceProvider<
    $Resource,
    $ResourceUncheckedCreateInput, // createOne
    $ResourceCreateManyInput, // createMany
    $ResourceUncheckedUpdateInput, // updateOne
    $ResourceUncheckedUpdateManyInput, // updateMany
    $ResourceWhereUniqueInput // deleteOne
  > = {
    // Create methods //////////////////////////////////////////////////
    create: async ({ client, variables }) => {
      return client
        .mutation(nounGql.create, variables)
        .toPromise()
        .then((result) => ({
          // ensure the id field is explicitly set for Refine.
          id: getPk(result.data),
          ...result.data,
        }));
    },

    createMany: async ({ client, variables }) => {
      return client
        .mutation(nounGql.createMany, {
          data: variables,
        })
        .toPromise()
        .then((result) => ({
          // ensure the id field is explicitly set for Refine.
          id: getPk(result.data),
          ...result.data,
        }));
    },

    // Read methods //////////////////////////////////////////////////
    getList: async ({
      client,
      pagination,
      hasPagination,
      sort,
      filters,
      // dataProviderName,
    }) => {
      return client
        .query(nounGql.getList, {
          skip: pagination?.current,
          take: pagination?.pageSize,
          // order = "asc" | "desc" in both refine and prisma
          orderBy: sort?.map(({ field, order }) => ({ field: order })),
          where: toPrismaFilters(filters!, caseInsensitive),
        })
        .toPromise()
        .then((result) => {
          const id = result.data.id;
          return {
            id,
            ...result.data,
          };
        });
    },

    getMany: async ({ client, ids }) => {
      return client
        .query(nounGql.getMany, {
          where: {
            OR: ids.map((id) => where(id)),
          },
        })
        .toPromise()
        .then((result) => {
          return {
            data: result.data.map((resource: $Resource) => ({
              id: getPk(resource),
              ...result.data,
            })),
          };
        });
    },

    getOne: async ({ client, id }) => {
      return client
        .query(nounGql.getOne, {
          where: where(id),
        })
        .toPromise()
        .then((result) => {
          return {
            data: {
              id: getPk(result.data),
              ...result.data,
            },
          };
        });
    },

    // Update methods //////////////////////////////////////////////////
    update: async ({ client, id, variables }) => {
      return client
        .mutation(nounGql.update, {
          data: variables,
          where: {
            id, // TODO: replace $pk with primary key
          },
        })
        .toPromise()
        .then((result) => {
          const id = getPk(result.data);
          return {
            id,
            ...result.data,
          };
        });
    },

    updateMany: async ({ client, ids, variables, metaData }) => {
      const result = await client
        .mutation(nounGql.updateMany, {
          where: {
            OR: ids.map((id) => where(id)),
          },
          data: {
            relationalMany: variables,
          },
        })
        .toPromise();
      return $ResourceProvider.getMany && (result.data?.count ?? 0 > 0)
        ? // prisma does not return the updated objects.
          // we need to make a second call to fetch these.
          $ResourceProvider.getMany({ client, ids, metaData })
        : { data: [] };
    },

    // Delete methods //////////////////////////////////////////////////
    deleteOne: async ({ client, variables }) => {
      return client
        .mutation(nounGql.deleteOne, variables!)
        .toPromise()
        .then((result) => {
          const id = getPk(result.data);
          return {
            data: {
              id,
              ...result.data,
            },
          };
        });
    },

    deleteMany: async ({ client, ids, metaData }) => {
      const result = await client
        .mutation(nounGql.deleteMany, {
          where: {
            OR: ids.map((id) => where(id)),
          },
        } as AnyVariables)
        .toPromise();
      return $ResourceProvider.getMany && (result.data?.count ?? 0 > 0)
        ? // prisma does not return the deleted objects.
          // we need to make a second call to fetch these.
          $ResourceProvider.getMany({ client, ids, metaData })
        : { data: [] };
    },
  };
  return $ResourceProvider;
};

export default makeResourceProvider;