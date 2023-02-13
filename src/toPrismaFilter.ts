import type { CrudFilter, LogicalFilter } from "@pankod/refine-core";
import type { WhereInput } from "./prismaWhere";

type ignoreCase = { mode: "insensitive" } | {};

export const toPrismaFilters = (
  filters: CrudFilter[],
  caseInsensitive: boolean
): WhereInput[] => {
  const ignoreCase = caseInsensitive ? { mode: "insensitive" } : {};
  return filters.map((filter) => toPrismaFilter(filter, ignoreCase)).flat(1);
};

// https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
// https://refine.dev/docs/api-reference/core/interfaceReferences/#crudfilter
// https://refine.dev/docs/advanced-tutorials/data-provider/handling-filters/

const toPrismaFilter = (
  filter: CrudFilter,
  ignoreCase: ignoreCase
): WhereInput | WhereInput[] => {
  const { operator, value } = filter;
  const Field = (f: CrudFilter) => (f as LogicalFilter).field;

  const prismaFilter: WhereInput | WhereInput[] = {
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#equals
    eq: { [Field(filter)]: { equals: value } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#equals
    ne: { NOT: { [Field(filter)]: { equals: value } } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#lt
    lt: { [Field(filter)]: { lt: value } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#gt
    gt: { [Field(filter)]: { gt: value } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#lte
    lte: { [Field(filter)]: { lte: value } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#gte
    gte: { [Field(filter)]: { gte: value } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#in
    in: { [Field(filter)]: { in: value } },
    nin: { NOT: { [Field(filter)]: { in: value } } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#contains
    contains: { [Field(filter)]: { contains: value, ...ignoreCase } },
    ncontains: {
      NOT: { [Field(filter)]: { contains: value, ...ignoreCase } },
    },
    containss: { [Field(filter)]: { contains: value } },
    ncontainss: { NOT: { [Field(filter)]: { contains: value } } },
    between: [
      { [Field(filter)]: { lte: value[0] } },
      { [Field(filter)]: { gte: value[1] } },
    ],
    nbetween: {
      NOT: {
        between: [
          { [Field(filter)]: { lte: value[0] } },
          { [Field(filter)]: { gte: value[1] } },
        ],
      },
    },
    null: { [Field(filter)]: { equals: null } },
    nnull: { NOT: { [Field(filter)]: { equals: null } } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#startswith
    startswith: { [Field(filter)]: { startsWith: value, ...ignoreCase } },
    nstartswith: {
      NOT: { [Field(filter)]: { startsWith: value, ...ignoreCase } },
    },
    startswiths: { [Field(filter)]: { startsWith: value } },
    nstartswiths: { NOT: { [Field(filter)]: { startsWith: value } } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#endswith
    endswith: { [Field(filter)]: { endsWith: value, ...ignoreCase } },
    nendswith: { NOT: { [Field(filter)]: { endsWith: value, ...ignoreCase } } },
    endswiths: { [Field(filter)]: { endsWith: value } },
    nendswiths: { NOT: { [Field(filter)]: { endsWith: value } } },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#and
    and: {
      AND: value.map((item: CrudFilter) => toPrismaFilter(item, ignoreCase)),
    },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#or
    or: {
      OR: value.map((item: CrudFilter) => toPrismaFilter(item, ignoreCase)),
    },
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#not
    not: { NOT: toPrismaFilter(value, ignoreCase) },
  }[operator];
  return prismaFilter;
};
